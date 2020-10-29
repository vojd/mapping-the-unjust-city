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
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
    console.log(' handle click');
    this.props.toggleTagVisible(this.props.value, this.state.isToggleOn);
  }

  render() {
    return (
      <label className="filter-input-container">
        {this.props.value}
        <input type="checkbox" onClick={this.handleClick}/>
        <span className="filter-input-checkmark"/>
      </label>
    );
  }
}
