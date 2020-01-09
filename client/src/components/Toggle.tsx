import * as React from 'react';

class ToggleProps {
  value: string;
  toggleTagVisible: Function;
}

class ToggleState {
  isToggleOn: boolean;
}

export class Toggle extends React.Component<ToggleProps, ToggleState> {
  constructor(props: any) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    console.log('tag', props.tags);

  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));

    this.props.toggleTagVisible(this.props.value, this.state.isToggleOn);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
        {this.props.value}
      </button>
    );
  }
}
