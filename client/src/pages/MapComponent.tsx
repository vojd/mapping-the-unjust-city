import * as React from 'react';
import { matrix, pan, scale } from '../math';
import { getRedLineNodes } from '../components/UndergroundLineDefinitions';
import { MapNode, UndergroundManager } from '../components/UndergroundLines';
import { COLOR_ORANGE, Station } from '../components/Station';
import { MapText } from '../components/MapText';
import { AppState } from '../state/AppState';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

const width = 1024;
const height = 768;
const gridX = 50;
const gridY = 50;

const xFromGrid = (x: number, direction: string) => {
  switch (direction) {
    case 'e':
      return x + (gridX * 3);
    case 'ne':
    case 'se':
      return x + gridX;
    case 'w':
      return x - (gridX * 3);
    case 'nw':
    case 'sw':
      return x - gridX;
    default:
      return x;
  }
};

const yFromGrid = (y: number, direction: string) => {
  switch (direction) {
    case 's':
    case 'se':
    case 'sw':
      return y + gridY;
    case 'n':
    case 'ne':
    case 'nw':
      return y - gridY;
    default:
      return y;
  }
};

interface UndergroundLineProps {
  nodes: MapNode[];
  parentNode: MapNode;
  undergroundManager: UndergroundManager;
}

const RedLine = (props: UndergroundLineProps): any => {
  const nodes = props.nodes;
  const undergroundManager = props.undergroundManager;
  const parentNode = props.parentNode;

  const stations = [];

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const previousNode = i === 0 ? parentNode : nodes[i - 1];
    let x = xFromGrid(previousNode.x, node.direction);
    let y = yFromGrid(previousNode.y, node.direction);

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
            ? node.branch.map((branchId: number) => {
              const n = undergroundManager.getNodesById(branchId);
              return (
                <RedLine
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

export class MapProps {
    mouseDown: Function;
    // mouseUp: Function;
    // mouseMove: Function;
}

export class MapState {
  isMoving: boolean;
  panX: number;
  panY: number;
  scaleFactor: number;
  mat: number[];
}

export class MapComponent extends React.Component<MapProps, AppState> {

  undergroundManager = new UndergroundManager();

  constructor(props: any) {
    super(props);
    // this.setState({
    //   scaleFactor: 0.8,
    //   panX: 0,
    //   panY: 20,
    //   mat: [
    //     1, 0, 0,
    //     1, 0, 0
    //   ]
    // });
  }

  onMouseDown = (e: any) => {
    console.log('mouse down');
    this.props.mouseDown();
  }

  onMouseUp = (e: any) => {
    console.log('mouse up');
    // this.props.mouseUp();
  }

  onMouseMove = (e: any) => {
    console.log('mouse move', e);
    // this.props.mouseMove();
  }

  render() {

    const mat = [
      1, 0, 0,
      1, 0, 0
    ];
    const scaleFactor = 0.8;
    const panX = 0;
    const panY = 20;

    const centralStation = {
      filled: 0,
      direction: '',
      name: 'T-Centralen',
      branch: null,
      x: width / 2,
      y: height / 2
    };

    const svgContainerStyle = {
      backgroundColor: '#000',
      position: 'fixed' as 'fixed'
    };
    const redLineNodes = getRedLineNodes(this.undergroundManager);
    return (
      <div className="full-screen" style={svgContainerStyle}>
        <svg
          width="1024"
          height="768"
          onMouseMove={this.onMouseMove}
          onMouseDown={this.onMouseDown}
          onTouchMove={this.onMouseMove}
        >
          <g
           transform={
             matrix(
               scale(
                 pan(mat, panX, panY),
                 scaleFactor)
             )
           }
          >
            <RedLine
              nodes={redLineNodes}
              parentNode={centralStation}
              undergroundManager={this.undergroundManager}
            />
          </g>
        </svg>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => state.mapState;

const mapDispatchToProps = (dispatch: Dispatch): MapProps => {
  return {
    // mouseDown: () => dispatch(mapMouseDown()),
    // mouseUp: () => dispatch(mapMouseUp()),
    // mouseMove: () => dispatch(mapMouseMove()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
