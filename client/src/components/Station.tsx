import * as React from 'react';
import { MapNode } from './UndergroundLines';
import { Route } from 'react-router';
import { slugify } from '../utils/slugify';

export const COLOR_ORANGE = 'rgb(243, 113, 30)';

interface Dim {
  r: number;
}

interface RouteCircleProps {
  x: number;
  y: number;
  r: number;
  isActive: boolean;
  node: MapNode;
}

const RouteCircle = (props: RouteCircleProps) => {

  return (
    <Route
      render={({history}) => (
        <circle
          cx={props.x}
          cy={props.y}
          r={props.isActive ? props.r + 2 : props.r}
          fill={COLOR_ORANGE}
          onClick={() => history.push(`/centre/${slugify(props.node.name)}/`)}
        />
      )}
    />
  );
};

export interface StationProps {
  x: number;
  y: number;
  node: MapNode;

  onClickCallback(node: MapNode): any;
}

export interface StationState {
  x: number;
  y: number;
  isActive: boolean;
}

export class Station extends React.Component<StationProps, StationState> {

  constructor(props: StationProps) {
    super(props);
    this.state = {
      x: props.x,
      y: props.y,
      isActive: false,
    };
  }

  public toggleActive = () => {
    console.log('on mouse enter');
    this.setState({
      isActive: !this.state.isActive
    });
  }

  render() {
    const dim: Dim = {
      r: 10
    };

    return (
      <RouteCircle
        x={this.state.x}
        y={this.state.y}
        r={this.state.isActive ? dim.r + 2 : dim.r}
        isActive={this.state.isActive}
        node={this.props.node}
      />
    );
  }
}
