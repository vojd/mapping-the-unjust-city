import * as React from 'react';
import './App.css';
import { matrix, pan, scale } from './math';
import { getRedLineNodes } from './components/UndergroundLineDefinitions';
import { MapNode, UndergroundManager } from './components/UndergroundLines';
import { StationInformation } from './components/StationInformation';
import { COLOR_ORANGE, Station } from './components/Station';

const width = 1024;
const height = 768;
const gridX = 50;
const gridY = 50;

const xFromGrid = (x: number, direction: string) => {
  switch (direction) {
    case 'e':
    case 'ne':
    case 'se':
      return x + gridX;
    case 'w':
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

  whenStationClicked(x: any): any;
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
          onClickCallback={props.whenStationClicked}
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
                  whenStationClicked={props.whenStationClicked}
                />
              );
            })
            : null
        }
      </g>
    )
    ;
  }

  return (
    <g>
      {stations.map(s => s)}
    </g>
  );
};

interface AppProps {
}

interface AppState {
  currentNode?: MapNode;
}

class App extends React.Component<AppProps, AppState> {

  undergroundManager = new UndergroundManager();

  constructor(props: any) {
    super(props);
    this.state = {currentNode: undefined};
  }

  public whenStationClicked = (node: MapNode) => {
    console.log('when station clicked', node);
    this.setState({
      currentNode: node
    });
  }

  render() {

    const mat = [
      1, 0, 0,
      1, 0, 0
    ];

    const scaleFactor = 1;
    const panX = 10;
    const panY = 20;
    const centralStation = {
      filled: 0,
      direction: '',
      name: 'T-Centralen',
      branch: null,
      x: width / 2,
      y: height / 2
    };

    const redLineNodes = getRedLineNodes(this.undergroundManager);
    return (
      <div className="App">
        {
          this.state.currentNode
            ? <StationInformation node={this.state.currentNode}/>
            : null
        }

        <svg width="1024" height="768">
          <g transform={matrix(scale(pan(mat, panX, panY), scaleFactor))}>
            <RedLine
              nodes={redLineNodes}
              parentNode={centralStation}
              undergroundManager={this.undergroundManager}
              whenStationClicked={this.whenStationClicked}
            />
          </g>
        </svg>
      </div>
    );
  }
}

export default App;
