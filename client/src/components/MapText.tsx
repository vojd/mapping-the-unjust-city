import * as React from 'react';
import { MapNode } from './UndergroundLines';

interface MapTextProps {
  x: number;
  y: number;
  node: MapNode;
}

export const MapTextTiltRight = ( props: MapTextProps ) => {
  const tx = props.x + -40;
  const ty = props.y + -220;
  const rotation = `rotate(20, ${tx}, ${ty})`;
  const translate = `translate(20, 0)`;
  return (
    <text
      x={props.x - 8}
      y={props.y - 40}
      transform={`${rotation} ${translate}`}
      className="map-text-bold"
    >
      {props.node.name}
    </text>
  );
};

export const MapTextAbove = ( props: MapTextProps ) => {
  const transform = `rotate(20, ${props.x}, ${props.y})`;
  return (
    <text
      x={props.x - 20}
      y={props.y - 15}
      transform={transform}
      className="map-text-bold"
      textAnchor="end"
    >
      {props.node.name}
    </text>
  );
};

export const MapTextRight = ( props: MapTextProps ) => {

  return (
    <g>
      <text
        x={props.x + 20}
        y={props.y + 8}
        className="map-text-bold"
      >
        {props.node.name}
      </text>
      // company name

    </g>
  );
};

export const MapTextLeft = ( props: MapTextProps ) => {

  return (
    <g>
      <text
        x={props.x - 100}
        y={props.y + 8}
        className="map-text-bold"
        textAnchor="start"
      >
        {props.node.name}
      </text>
      // company name

    </g>
  );
};

export const MapText = ( props: MapTextProps ) => {

  if (!props.node.isVisible) {
    return (
      <p>inactive</p>
    );
  }

  const {horizontalText} = props.node;
  if (horizontalText) {
    return (
      <MapTextLeft
        x={props.x}
        y={props.y}
        node={props.node}
      />
    );
  }

  switch (props.node.direction) {
    case 'nw':
      // ugly hack to prevent fridhemsplan to appear twice
      if (props.node.name === 'Fridhemsplan') {
        return null;
      } else {
        return (
          <MapTextRight
            x={props.x}
            y={props.y - 6}
            node={props.node}
          />
        );
      }
    case 'sw':
      return (
        <MapTextRight
          x={props.x}
          y={props.y}
          node={props.node}
        />
      );
    case 'w':
    case 'e':
      return (
        <MapTextAbove
          x={props.x}
          y={props.y}
          node={props.node}
        />
      );

    case 'ne':
      return (
        <MapTextRight
          x={props.x}
          y={props.y}
          node={props.node}
        />
      );
    default:
      return (
        <MapTextRight
          x={props.x}
          y={props.y}
          node={props.node}
        />
      );
  }

};
