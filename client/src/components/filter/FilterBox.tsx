import * as React from 'react';
import { Toggle } from '../Toggle';
import { Company, Tag } from '../../models/models';
import { MapNodeTag } from '../UndergroundLines';
import { Action } from 'redux';
import {
  toggleFilterBoxOpenAction,
  toggleOwnerVisibilityAction,
  toggleTagVisibilityAction
} from '../../actions/mapActions';
import { AppState } from '../../interfaces/AppState';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

interface FilterBoxProps {
  isFilterBoxOpen: boolean;
  tags: MapNodeTag[];
  companies: any[];

  toggleTagVisible: Function;
  toggleTagVisibilityOnOwner: Function;
  toggleFilterBoxOpen: Function;
}

class FilterBox extends React.Component<FilterBoxProps, any> {
  constructor( props: any ) {
    super(props);

    this.setState({
      isOpen: true
    });
  }

  toggleFilterBoxOpen = () => {
    console.log('toggleFilterBoxOpen');
    this.props.toggleFilterBoxOpen();
  }

  toggleTagVisibility = ( value: string, isOn: boolean ) => {
    this.props.toggleTagVisible(value, isOn);
  }

  toggleTagVisibilityOnOwner = ( value: string, isOn: boolean ) => {
    this.props.toggleTagVisibilityOnOwner(value, isOn);
  }

  render() {

    return (
      <div className="filter-box shadow">
        <div
          onClick={() => {
            this.toggleFilterBoxOpen();
          }}
          className="filter-box-head"
        >
          <div className={`arrow fa ${this.props.isFilterBoxOpen ? 'fa-angle-up' : 'fa-angle-down'}`}/>
          <h4>FILTRERING</h4>
        </div>

        <div className={`filter-group ${!this.props.isFilterBoxOpen ? 'filter-group-closed' : ''}`}>
          {
            this.props.tags.map(( t: Tag, id: number ) => {
              return (<Toggle key={id} value={t.name} toggleTagVisible={this.toggleTagVisibility}/>);
            })
          }
        </div>

        {/* this could be placed at a sidebar*/}
        <div className={`filter-group ${!this.props.isFilterBoxOpen ? 'filter-group-closed' : ''}`}>
          {
            this.props.companies.map(( t: Company, id: number ) => {
              return (<Toggle key={id} value={t.name} toggleTagVisible={this.toggleTagVisibilityOnOwner}/>);
            })
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ( state: AppState ) => {
  return state.mapState;
};

const mapDispatchToProps = ( dispatch: ThunkDispatch<AppState, void, Action> ) => {
  return {
    toggleTagVisible: ( val: string, isOn: boolean ) => dispatch(toggleTagVisibilityAction(val, isOn)),
    toggleTagVisibilityOnOwner: ( val: string, isOn: boolean ) => dispatch(toggleOwnerVisibilityAction(val, isOn)),
    toggleFilterBoxOpen: () => dispatch(toggleFilterBoxOpenAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterBox);
