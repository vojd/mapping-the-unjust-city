import * as React from 'react';
import { MapNode } from './UndergroundLines';
import { Route } from 'react-router';

interface MapTextProps {
  x: number;
  y: number;
  node: MapNode;
}

const MapCompanyName = ( props: any ) => {
  return (
    <Route
      render={( {history} ) => (
        <text
          x={props.x + 120}
          y={props.y + 8}
          className="map-text"
          onClick={() => history.push(`/company/${props.company.slug}/`)}
        >
          {props.company.name}
        </text>
      )}
    />
  );
};

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
  const tx = props.x + -40;
  const ty = props.y + -220;
  const transform = `rotate(20, ${tx}, ${ty})`;
  return (
    <text
      x={props.x - 8}
      y={props.y - 40}
      transform={transform}
      className="map-text-bold"
    >
      {props.node.name}
    </text>
  );
};

export const MapTextRight = ( props: MapTextProps ) => {
  const companySlug = props.node.owner ? props.node.owner.slug : null;

  return (
    <g>
      <text
        x={props.x + 20}
        y={props.y + 8}
        className="map-text-bold"
      >
        {props.node.name}
      </text>

      {companySlug ? <MapCompanyName x={props.x} y={props.y} company={props.node.owner}/> : null}
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

  switch (props.node.direction) {
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
        <MapTextTiltRight
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
