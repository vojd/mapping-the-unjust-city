import * as React from 'react';
import { SyntheticEvent } from 'react';
import { matrix, pan, scale } from '../math';
import { MapNode } from './UndergroundLines';
import { COLOR_ORANGE, Station } from './Station';
import { MapText, MapTextAboveRight, MapTextAlignment } from './MapText';
import { Action } from 'redux';
import { connect } from 'react-redux';
import {
  closeVideoAction,
  mapMouseDown,
  mapMouseMove,
  mapMouseUp,
  toggleOwnerVisibilityAction,
  toggleTagVisibilityAction
} from '../actions/mapActions';
import { positionFixed } from '../react-styles/styles';
import { fetchMapDataAction } from '../actions/fetchMapDataAction';
import { ThunkDispatch } from 'redux-thunk';
import { fetchTagDataAction } from '../actions/fetchTagDataAction';
import { fetchCompaniesAction } from '../actions/fetchCompaniesAction';
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

interface UndergroundLineProps {
  nodes: MapNode[];
  parentNode: MapNode;
}

const UndergroundLine = ( props: UndergroundLineProps ): any => {
  const nodes = props.nodes;
  const parentNode = props.parentNode;

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
    // this.props.toggleTagVisibility(tag);
    console.log('toggleTagVisibility', value, isOn);
    this.props.toggleTagVisible(value, isOn);
  }

  toggleTagVisibilityOnOwner = ( value: string, isOn: boolean ) => {
    this.props.toggleTagVisibilityOnOwner(value, isOn);
  }

  closeVideo = () => {
    this.props.closeVideo();
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

    return (
      <div className="full-screen" style={positionFixed}>
        {
          this.props.isVideoVisible
            ?
            <div className="video-overlay" onClick={this.closeVideo}>
              <div className="video-overlay-text">
                <p>Stockholm, November 2020.</p>

                <p>After decades of deregulation, Swedish infrastructure has been changed
                  from the roots, the land, the plot, the real estate, the property - ownership.</p>

                <p>Privatization through tenure conversion and gentrification make cities more economically polarized.
                  The transformation of public property to private is a motor for the financialization.
                  Property ownership is fundamental for how our lives are organized.
                  But this fundamental condition is often hidden or obscured from our view.
                  And when the owner is made visible, it is normally on their terms.
                  Knowledge about finance and ownership is reserved for a narrow layer of society;
                  difficult to access and hard to grasp.</p>

                <p>Our collective work responds to this state of disorientation.</p>

                <p>How can we resist normalising corporate presence?</p>

                <p>How can finance and ownership be portrayed without abstraction and mystification?</p>

                <p>The project Mapping the Unjust City aims to explore how mapping and infographics can visualise
                  ownership and financial relations.
                  More specifically local centres in the context of Stockholm.
                  The presentation of data and supplementary narratives are reminders of the stark reality in which we
                  unconsciously navigate through.
                  The map presented here is a map under construction unfolding throughout the online exhibition.</p>
              </div>
              <video autoPlay muted loop id="myVideo">
                <source src="./video_background01.mp4" type="video/mp4"/>
              </video>
            </div>
            : null
        }
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

            <MapTextAboveRight x={centralStation.x} y={centralStation.y} node={centralStation}/>
            <Station
              x={centralStation.x}
              y={centralStation.y}
              node={centralStation}
            />

          </g>
        </svg>
s
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
    fetchTagData: () => dispatch(fetchTagDataAction()),
    fetchCompanies: () => dispatch(fetchCompaniesAction()),
    mouseDown: ( e: MouseEvent | TouchEvent ) => dispatch(mapMouseDown(e)),
    mouseUp: ( e: MouseEvent | TouchEvent ) => dispatch(mapMouseUp(e)),
    mouseMove: ( e: MouseEvent | TouchEvent ) => dispatch(mapMouseMove(e)),
    toggleTagVisible: ( val: string, isOn: boolean ) => dispatch(toggleTagVisibilityAction(val, isOn)),
    toggleTagVisibilityOnOwner: ( val: string, isOn: boolean ) => dispatch(toggleOwnerVisibilityAction(val, isOn)),
    closeVideo: () => dispatch(closeVideoAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
