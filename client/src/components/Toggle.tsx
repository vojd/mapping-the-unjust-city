import * as React from 'react';

class ToggleProps {
  value: string;
  toggleTagVisible: Function;
  extra?: {
    prefix: string,
    suffix: string,
  };
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
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
    this.props.toggleTagVisible(this.props.value, this.state.isToggleOn);
  }

  render() {
    return (
      <label className="filter-input-container">
        {this.props.extra ? this.props.extra.prefix : ''}
        {this.props.value}
        {this.props.extra ? this.props.extra.suffix : ''}
        <input type="checkbox" onClick={this.handleClick}/>
        <span className="filter-input-checkmark"/>
      </label>
    );
  }
}
