import * as React from 'react';
import { SyntheticEvent } from 'react';
import { matrix, pan, scale } from '../math';
import {
  getBlueLineNodesEast,
  getBlueLineNodesWest,
  getRedLineNodes,
  getRedLineNodesNorth
} from '../models/UndergroundLineDefinitions';
import { MapNode, MapNodeTag, UndergroundManager } from '../components/UndergroundLines';
import { COLOR_ORANGE, Station } from '../components/Station';
import { MapText } from '../components/MapText';
import { AppState } from '../state/AppState';
import { Action } from 'redux';
import { connect } from 'react-redux';
import { mapMouseDown, mapMouseMove, mapMouseUp, toggleTagVisibleAction } from '../actions/mapActions';
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
  undergroundManager: UndergroundManager;
}

const UndergroundLine = ( props: UndergroundLineProps ): any => {
  const nodes = props.nodes;
  const undergroundManager = props.undergroundManager;
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
                  undergroundManager={undergroundManager}
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

export const getInitialMapState = (): MapState => {
  const undergroundManager = new UndergroundManager();
  return {
    scaleFactor: 0.8,
    panX: 1050,
    panY: 20,
    mat: [
      1, 0, 0,
      1, 0, 0
    ],
    isMoving: false,

    previousMouseCoords: {x: 0, y: 0},

    undergroundManager: undergroundManager,
    nodes: {
      redLineNodes: getRedLineNodes(),
      redLineNodesNorth: getRedLineNodesNorth(),
      blueLineNodesEast: getBlueLineNodesEast(),
      blueLineNodesWest: getBlueLineNodesWest(),
    },

    tags: [],
    companies: [],
  };
};

export class MapProps {
  mouseDown: Function;
  mouseUp: Function;
  mouseMove: Function;

  panX: number;
  panY: number;

  fetchMapData: Function;
  fetchTagData: Function;
  fetchCompanies: Function;

  undergroundManager: UndergroundManager;
  nodes: {
    redLineNodes: MapNode[],
    redLineNodesNorth: MapNode[],
    blueLineNodesEast: MapNode[],
    blueLineNodesWest: MapNode[],
  };

  tags: MapNodeTag[];
  companies: any[];

  toggleTagVisible: Function;
}

export class MapState {
  isMoving: boolean;
  panX: number;
  panY: number;
  scaleFactor: number;
  mat: number[];

  previousMouseCoords: {
    x: number;
    y: number;
  };

  undergroundManager: UndergroundManager;
  nodes: {
    redLineNodes: MapNode[],
    redLineNodesNorth: MapNode[],
    blueLineNodesEast: MapNode[],
    blueLineNodesWest: MapNode[],
  };

  tags: any[];
  companies: any[];
}

class MapComponent extends React.Component<MapProps, AppState> {

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

  toggleTagVisible = ( value: string, isOn: boolean ) => {
    // this.props.toggleTagVisible(tag);
    console.log('toggleTagVisible', value, isOn);
    this.props.toggleTagVisible(value, isOn);
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

    // const greenLineNodesSouth = getGreenLineNodesSouth(this.undergroundManager);
    // const greenLineNodesWest = getGreenLineNodesWest(this.undergroundManager);

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
              undergroundManager={this.props.undergroundManager}
            />

            <UndergroundLine
              nodes={this.props.nodes.redLineNodesNorth}
              parentNode={centralStation}
              undergroundManager={this.props.undergroundManager}
            />

            <UndergroundLine
              nodes={this.props.nodes.blueLineNodesEast}
              parentNode={centralStation}
              undergroundManager={this.props.undergroundManager}
            />

            <UndergroundLine
              nodes={this.props.nodes.blueLineNodesWest}
              parentNode={centralStation}
              undergroundManager={this.props.undergroundManager}
            />
          </g>
        </svg>

        <div className="legend-container">
          <div className="legend">
            {
              this.props.tags.map(( t ) => {
                return (<Toggle key={t.name} value={t.name} toggleTagVisible={this.toggleTagVisible}/>);
              })
            }
          </div>

          {/* this could be placed at a sidebar*/}
          <div className="legend">
            {
              this.props.companies.map(( t ) => {
                return (<Toggle key={t.name} value={t.name} toggleTagVisible={this.toggleTagVisible}/>);
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
    toggleTagVisible: ( val: string, isOn: boolean ) => dispatch(toggleTagVisibleAction(val, isOn))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
