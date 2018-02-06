import * as React from 'react';

const RedLine = () => {
  const lineStyle = {
    stroke: 'rgb(255,0,0)',
    strokeWidth: '2'
  };

  return (
    <svg height={210} width={500}>
      <line x1="0" y1="500" x2="200" y2="200" style={lineStyle} />
    </svg>
  );
};

export class MapContainer extends React.Component {
  render() {
    return (
      <div>
        <RedLine/>
      </div>
    );
  }
}
