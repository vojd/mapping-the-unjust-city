import * as React from 'react';
import { SyntheticEvent } from 'react';
import { matrix, pan, scale } from '../math';
import { MapNode } from './UndergroundLines';
import { COLOR_ORANGE, Station } from './Station';
import { MapText, MapTextAboveRight, MapTextAlignment } from './MapText';
import { Action } from 'redux';
import { connect } from 'react-redux';
import {
  mapMouseDown,
  mapMouseMove,
  mapMouseUp,
  toggleOwnerVisibilityAction,
  toggleTagVisibilityAction
} from '../actions/mapActions';
import { positionFixed } from '../react-styles/styles';
import { fetchMapDataAction } from '../actions/fetchMapDataAction';
import { ThunkDispatch } from 'redux-thunk';
import { MapProps } from '../interfaces/MapInterfaces';
import { AppState } from '../interfaces/AppState';
import { default as FilterBox } from './filter/FilterBox';

const width = 1024;
const height = 768;
const gridX = 50;
const gridY = 50;

const xFromGrid = ( x: number, direction: string, lengthMultiplier: number = 1 ) => {
  switch (direction) {
    case 'e':
      return x + (gridX * 3 * lengthMultiplier);
    case 'ne':
    case 'se':
      return x + gridX * lengthMultiplier;
    case 'w':
      return x - (gridX * 3 * lengthMultiplier);
    case 'nw':
    case 'sw':
      return x - gridX * lengthMultiplier;
    default:
      return x;
  }
};

const yFromGrid = ( y: number, direction: string, lengthMultiplier: number = 1 ) => {
  switch (direction) {
    case 's':
    case 'se':
    case 'sw':
      return y + gridY * lengthMultiplier;
    case 'n':
    case 'ne':
    case 'nw':
      return y - gridY * lengthMultiplier;
    default:
      return y;
  }
};

const someTrue = (arr: any) => {
  return Object
    .keys(arr)
    .map(k => arr[k])
    .some(k => k);
};

const isCentralStationVisible = (props: MapProps) => {
  return props && (
    !someTrue(props.soldYears) &&
    !someTrue(props.publicDisplayMode)
  );
};

interface UndergroundLineProps {
  nodes: MapNode[];
  parentNode: MapNode;
  lang: string;
}

const UndergroundLine = ( props: UndergroundLineProps ): any => {
  const nodes = props.nodes;
  const parentNode = props.parentNode;
  const lang = props.lang;

  const lines = [];
  const stations = [];

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const previousNode = i === 0 ? parentNode : nodes[i - 1];

    const lengthMultiplier = node.lengthMultiplier ? node.lengthMultiplier : 1;
    const x = xFromGrid(previousNode.x, node.direction, lengthMultiplier);
    const y = yFromGrid(previousNode.y, node.direction, lengthMultiplier);

    // store the positions inside the node objects
    node.x = x;
    node.y = y;

    const lineCoords = {
      x1: previousNode.x,
      y1: previousNode.y,
      x2: node.x,
      y2: node.y
    };

    lines.push(
      <g key={i}>
        <line {...lineCoords} stroke={COLOR_ORANGE} strokeWidth="10"/>
        <MapText
          x={x}
          y={y}
          node={node}
        />
        {
          node.branches
            ? node.branches.map(( branchNodes, idx ) => {
              return (
                <UndergroundLine
                  key={`${node.name}-${idx}`}
                  nodes={branchNodes}
                  parentNode={node}
                  lang={lang}
                />
              );
            })
            : null
        }
      </g>
    );

    stations.push(
      <g key={i}>
        <Station
          x={x}
          y={y}
          node={node}
          lang={lang}
        />
      </g>
    );
  }

  return (
    <g>
      <g>{lines.map(l => l)}</g>
      <g>{stations.map(s => s)}</g>
    </g>
  );
};

const getLangFromUrl = () => {
  try {
    const part = location.href.split('#')[1];
    if (part.startsWith('/en/')) {
      return 'en';
    } else if (part.startsWith('/se/')) {
      return 'se';
    }
  } catch (e) {
    return 'en';
  }
  return 'en'; // default language
};

export class MapComponent extends React.Component<MapProps, AppState> {

  constructor( props: MapProps ) {
    super(props);
    props.fetchMapData();
  }

  onMouseDown = ( e: SyntheticEvent ) => {
    this.props.mouseDown(e);
  }

  onMouseUp = ( e: any ) => {
    this.props.mouseUp();
  }

  onMouseMove = ( e: SyntheticEvent ) => {
    this.props.mouseMove(e);
  }

  toggleTagVisibility = ( value: string, isOn: boolean ) => {
    this.props.toggleTagVisible(value, isOn);
  }

  toggleTagVisibilityOnOwner = ( value: string, isOn: boolean ) => {
    this.props.toggleTagVisibilityOnOwner(value, isOn);
  }

  render() {

    const mat = [
      1, 0, 0,
      1, 0, 0
    ];

    const scaleFactor = 0.6;

    const centralStation = {
      filled: 0,
      direction: '',
      name: 'T-Centralen',
      branch: null,
      x: width / 2,
      y: height / 2,
      sold: '',
      private: true,
      ownershipType: 'none',
      horizontalText: false,
      textAlignment: MapTextAlignment.RIGHT,
      isVisible: true,
      isActive: false,
      tags: []
    };

    const lang = getLangFromUrl();

    return (
      <div className="full-screen" style={positionFixed}>
        <svg
          className="map-svg"
          width="100%"
          height="100%"
          onMouseDown={this.onMouseDown}
          onTouchStart={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onTouchEnd={this.onMouseUp}
          onMouseMove={this.onMouseMove}
          onTouchMove={this.onMouseMove}
        >
          <g
            transform={
              matrix(
                scale(
                  pan(mat, this.props.panX, this.props.panY),
                  scaleFactor)
              )
            }
          >

            <UndergroundLine
              nodes={this.props.nodes.redLineNodes}
              parentNode={centralStation}
              lang={lang}
            />

            <UndergroundLine
              nodes={this.props.nodes.redLineNodesNorth}
              parentNode={centralStation}
              lang={lang}
            />

            <UndergroundLine
              nodes={this.props.nodes.blueLineNodesEast}
              parentNode={centralStation}
              lang={lang}
            />

            <UndergroundLine
              nodes={this.props.nodes.blueLineNodesWest}
              parentNode={centralStation}
              lang={lang}
            />

            <UndergroundLine
              nodes={this.props.nodes.greenLineNodesWest}
              parentNode={centralStation}
              lang={lang}
            />

            <UndergroundLine
              nodes={this.props.nodes.greenLineNodesSouth}
              parentNode={centralStation}
              lang={lang}
            />

            {
              isCentralStationVisible(this.props)
                ?
                <g>
                  <MapTextAboveRight x={centralStation.x} y={centralStation.y} node={centralStation}/>
                  <Station
                    x={centralStation.x}
                    y={centralStation.y}
                    node={centralStation}
                    lang={lang}
                  />
                </g>
                : null
            }

          </g>
        </svg>

        <FilterBox />
      </div>
    );
  }
}

const mapStateToProps = ( state: AppState ) => {
  return state.mapState;
};

const mapDispatchToProps = ( dispatch: ThunkDispatch<AppState, void, Action> ) => {
  return {
    fetchMapData: () => dispatch(fetchMapDataAction()),
    mouseDown: ( e: MouseEvent | TouchEvent ) => dispatch(mapMouseDown(e)),
    mouseUp: ( e: MouseEvent | TouchEvent ) => dispatch(mapMouseUp(e)),
    mouseMove: ( e: MouseEvent | TouchEvent ) => dispatch(mapMouseMove(e)),
    toggleTagVisible: ( val: string, isOn: boolean ) => dispatch(toggleTagVisibilityAction(val, isOn)),
    toggleTagVisibilityOnOwner: ( val: string, isOn: boolean ) => dispatch(toggleOwnerVisibilityAction(val, isOn)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
