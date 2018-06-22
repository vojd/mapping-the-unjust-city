import * as React from 'react';
import { MapNode } from './UndergroundLines';

export const COLOR_ORANGE = 'rgb(243, 113, 30)';

interface Dim {
  r: number;
}

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

  public onClick = () => {
    this.props.onClickCallback(this.props.node);
  }

  render() {
    const dim: Dim = {
      r: 10
    };

    return (
      <circle
        cx={this.state.x}
        cy={this.state.y}
        r={this.state.isActive ? dim.r + 2 : dim.r}
        fill={COLOR_ORANGE}
        onMouseEnter={this.toggleActive}
        onMouseLeave={this.toggleActive}
        onClick={this.onClick}
      />
    );
  }
}
