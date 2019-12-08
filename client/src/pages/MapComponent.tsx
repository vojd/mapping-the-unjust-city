import * as React from 'react';
import { SyntheticEvent } from 'react';
import { matrix, pan, scale } from '../math';
import {
  getBlueLineNodesEast,
  getBlueLineNodesWest,
  getRedLineNodes,
  getRedLineNodesNorth
} from '../models/UndergroundLineDefinitions';
import { MapNode, UndergroundManager } from '../components/UndergroundLines';
import { COLOR_ORANGE, Station } from '../components/Station';
import { MapText } from '../components/MapText';
import { AppState } from '../state/AppState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { mapMouseDown, mapMouseMove, mapMouseUp } from '../actions/mapActions';
import { positionFixed } from '../react-styles/styles';

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

const yFromGrid = ( y: number, direction: string, lengthMultiplier: number = 1) => {
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
      <g>
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

        // Branch off
        {
          node.branch
            ? node.branch.map(( branchId: number ) => {
              const n = undergroundManager.getNodesById(branchId);
              return (
                <UndergroundLine
                  key={`${node.name}-${branchId}`}
                  nodes={n}
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
  return {
    scaleFactor: 0.8,
    panX: -350,
    panY: 20,
    mat: [
      1, 0, 0,
      1, 0, 0
    ],
    isMoving: false,

    previousMouseCoords: {x: 0, y: 0},
  };
};

export class MapProps {
  mouseDown: Function;
  mouseUp: Function;
  mouseMove: Function;

  panX: number;
  panY: number;
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
}

class MapComponent extends React.Component<MapProps, AppState> {

  undergroundManager = new UndergroundManager();

  constructor( props: MapProps ) {
    super(props);
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

    const redLineNodes = getRedLineNodes(this.undergroundManager);
    const redLineNodesNorth = getRedLineNodesNorth(this.undergroundManager);

    const blueLineNodesEast = getBlueLineNodesEast(this.undergroundManager);
    const blueLineNodesWest = getBlueLineNodesWest(this.undergroundManager);

    // const greenLineNodesSouth = getGreenLineNodesSouth(this.undergroundManager);
    // const greenLineNodesWest = getGreenLineNodesWest(this.undergroundManager);

    return (
      <div className="full-screen" style={positionFixed}>
        <svg
          width="1024"
          height="768"
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
              nodes={redLineNodes}
              parentNode={centralStation}
              undergroundManager={this.undergroundManager}
            />

            <UndergroundLine
              nodes={redLineNodesNorth}
              parentNode={centralStation}
              undergroundManager={this.undergroundManager}
            />

            <UndergroundLine
              nodes={blueLineNodesEast}
              parentNode={centralStation}
              undergroundManager={this.undergroundManager}
            />

            <UndergroundLine
              nodes={blueLineNodesWest}
              parentNode={centralStation}
              undergroundManager={this.undergroundManager}
            />

            {/*<UndergroundLine*/}
              {/*nodes={greenLineNodesSouth}*/}
              {/*parentNode={centralStation}*/}
              {/*undergroundManager={this.undergroundManager}*/}
            {/*/>*/}

            {/*<UndergroundLine*/}
              {/*nodes={greenLineNodesWest}*/}
              {/*parentNode={centralStation}*/}
              {/*undergroundManager={this.undergroundManager}*/}
            {/*/>*/}

          </g>
        </svg>
      </div>
    );
  }
}

const mapStateToProps = ( state: AppState ) => {
  return state.mapState;
};

const mapDispatchToProps = ( dispatch: Dispatch ) => {
  return {
    mouseDown: ( e: MouseEvent | TouchEvent ) => dispatch(mapMouseDown(e)),
    mouseUp: () => dispatch(mapMouseUp()),
    mouseMove: ( e: MouseEvent | TouchEvent ) => dispatch(mapMouseMove(e)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
