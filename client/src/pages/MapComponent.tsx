import * as React from 'react';
import { SyntheticEvent } from 'react';
import { matrix, pan, scale } from '../math';
import { MapNode, MapNodeTag } from '../components/UndergroundLines';
import { COLOR_ORANGE, Station } from '../components/Station';
import { MapText } from '../components/MapText';
import { AppState } from '../state/AppState';
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
import { Toggle } from '../components/Toggle';
import { fetchTagDataAction } from '../actions/fetchTagDataAction';
import { fetchCompaniesAction } from '../actions/fetchCompaniesAction';

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
      return y * lengthMultiplier;
  }
};

interface UndergroundLineProps {
  nodes: MapNode[];
  parentNode: MapNode;
}

const UndergroundLine = ( props: UndergroundLineProps ): any => {
  const nodes = props.nodes;
  const parentNode = props.parentNode;

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

    stations.push(
      <g key={i}>
        <line {...lineCoords} stroke={COLOR_ORANGE} strokeWidth="10"/>
        <Station
          x={x}
          y={y}
          node={node}
        />

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
                />
              );
            })
            : null
        }
      </g>
    );
  }

  return (
    <g>
      {stations.map(s => s)}
    </g>
  );
};

interface UndergroundNodes {
    redLineNodes: MapNode[];
    redLineNodesNorth: MapNode[];
    blueLineNodesEast: MapNode[];
    blueLineNodesWest: MapNode[];
    greenLineNodesWest: MapNode[];
    greenLineNodesSouth: MapNode[];
}

export interface MapProps {
  mouseDown: Function;
  mouseUp: Function;
  mouseMove: Function;

  panX: number;
  panY: number;

  fetchMapData: Function;
  fetchTagData: Function;
  fetchCompanies: Function;

  nodes: UndergroundNodes;

  tags: MapNodeTag[];
  companies: any[];

  toggleTagVisible: Function;
  toggleTagVisibilityOnOwner: Function;
}

export interface MapState {
  isMoving: boolean;
  panX: number;
  panY: number;
  scaleFactor: number;
  mat: number[];

  previousMouseCoords: {
    x: number;
    y: number;
  };

  nodes: UndergroundNodes;

  tags: any[];
  visibleTags: string[];
  visibleOwners: string[];
  companies: any[];
}

export class MapComponent extends React.Component<MapProps, AppState> {

  constructor( props: MapProps ) {
    super(props);
    props.fetchMapData();
    props.fetchTagData();
    props.fetchCompanies();
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
    // this.props.toggleTagVisibility(tag);
    console.log('toggleTagVisibility', value, isOn);
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

    const scaleFactor = 0.8;

    const centralStation = {
      filled: 0,
      direction: '',
      name: 'T-Centralen',
      branch: null,
      x: width / 2,
      y: height / 2
    };

    return (
      <div className="full-screen" style={positionFixed}>
        <svg
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
            />

            <UndergroundLine
              nodes={this.props.nodes.redLineNodesNorth}
              parentNode={centralStation}
            />

            <UndergroundLine
              nodes={this.props.nodes.blueLineNodesEast}
              parentNode={centralStation}
            />

            <UndergroundLine
              nodes={this.props.nodes.blueLineNodesWest}
              parentNode={centralStation}
            />

            <UndergroundLine
              nodes={this.props.nodes.greenLineNodesWest}
              parentNode={centralStation}
            />

            <UndergroundLine
              nodes={this.props.nodes.greenLineNodesSouth}
              parentNode={centralStation}
            />
          </g>
        </svg>

        <div className="legend-container">
          <div>
            <h4>
              <div><span className="fa fa-arrow-up"/> FILTRERING</div>
            </h4>
          </div>
          <div className="legend">
            {
              this.props.tags.map(( t, id ) => {
                return (<Toggle key={id} value={t.name} toggleTagVisible={this.toggleTagVisibility}/>);
              })
            }
          </div>

          {/* this could be placed at a sidebar*/}
          <div className="legend">
            {
              this.props.companies.map(( t, id ) => {
                return (<Toggle key={id} value={t.name} toggleTagVisible={this.toggleTagVisibilityOnOwner}/>);
              })
            }
          </div>
        </div>
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
    fetchTagData: () => dispatch(fetchTagDataAction()),
    fetchCompanies: () => dispatch(fetchCompaniesAction()),
    mouseDown: ( e: MouseEvent | TouchEvent ) => dispatch(mapMouseDown(e)),
    mouseUp: ( e: MouseEvent | TouchEvent ) => dispatch(mapMouseUp(e)),
    mouseMove: ( e: MouseEvent | TouchEvent ) => dispatch(mapMouseMove(e)),
    toggleTagVisible: ( val: string, isOn: boolean ) => dispatch(toggleTagVisibilityAction(val, isOn)),
    toggleTagVisibilityOnOwner: ( val: string, isOn: boolean ) => dispatch(toggleOwnerVisibilityAction(val, isOn)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
