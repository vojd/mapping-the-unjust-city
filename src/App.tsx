import * as React from 'react';
import './App.css';
import { matrix, pan, scale } from './math';

const Station = () => {
  interface Dim {
    r: number;
  }

  const dim: Dim = {
    r: 10
  };

  const resize = () => {
    dim.r += 10;
  };

  return (
    <g onMouseEnter={resize}>
      <circle cx={100} cy={10} {...dim} fill="black"/>
    </g>
  );
};


const blueLine = [
  {
    name: 'Blue line',
    subs: [
      {
        coords: {}
      }
    ]

  }
];

class App extends React.Component {
  render() {
    const coords = {
      x1: 100,
      y1: 10,
      x2: 100,
      y2: 100,

      strokeWidth: 2,
    };

    const mat = [
      1, 0, 0,
      1, 0, 0
    ];

    const scaleFactor = 1;
    const panX = 10;
    const panY = 20;

    return (
      <div className="App">
        <svg>
          <g transform={matrix(scale(pan(mat, panX, panY), scaleFactor))}>
            <line {...coords} stroke="red"/>
            <line {...blueLine.} stroke="red"/>
            <Station />
          </g>
        </svg>
      </div>
    );
  }
}

export default App;
