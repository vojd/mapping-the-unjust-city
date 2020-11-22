import * as React from 'react';
import { Toggle } from '../Toggle';
import { MapNodeTag } from '../UndergroundLines';
import { Action } from 'redux';
import {
  toggleFilterBoxOpenAction,
  toggleOwnerVisibilityAction, togglePublicPrivateAllVisibilityAction, toggleSoldYearVisibilityAction,
  toggleTagVisibilityAction
} from '../../actions/mapActions';
import { AppState } from '../../interfaces/AppState';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

interface FilterBoxProps {
  isFilterBoxOpen: boolean;
  tags: MapNodeTag[];
  companies: any[];
  soldYears: {
    [key: string]: boolean
  };

  publicDisplayMode: {
    [key: string]: boolean
  };

  toggleSoldYearVisibility: Function;
  togglePublicVisibility: Function;
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
    this.props.toggleFilterBoxOpen();
  }

  toggleSoldYearVisibility = (value: string, isOn: boolean) => {
    this.props.toggleSoldYearVisibility(value, isOn);
  }

  togglePublicVisibility = (value: string, isOn: boolean) => {
    this.props.togglePublicVisibility(value, isOn);
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
          <p>Filter</p>
        </div>

        <div className={`filter-group ${!this.props.isFilterBoxOpen ? 'filter-group-closed' : ''}`}>
          {
            Object.keys(this.props.publicDisplayMode).map(( publicMode: string ) => {
              return (
                <Toggle
                  key={publicMode}
                  label={publicMode}
                  value={publicMode}
                  toggleTagVisible={this.togglePublicVisibility}
                />
              );
            })
          }
        </div>

        <div className={`filter-group ${!this.props.isFilterBoxOpen ? 'filter-group-closed' : ''}`}>
          {
            Object.keys(this.props.soldYears).map(( year: string ) => {
              let label = year === '0' ? 'Ongoing sale' : `Sold ${year}'s`;
              return (
                <Toggle
                  key={year}
                  label={label}
                  value={year}
                  toggleTagVisible={this.toggleSoldYearVisibility}
                />
              );
            })
          }
        </div>

        {/*<div className={`filter-group ${!this.props.isFilterBoxOpen ? 'filter-group-closed' : ''}`}>*/}
        {/*  {*/}
        {/*    this.props.tags.map(( t: Tag, id: number ) => {*/}
        {/*      return (<Toggle key={id} value={t.name} toggleTagVisible={this.toggleTagVisibility}/>);*/}
        {/*    })*/}
        {/*  }*/}
        {/*</div>*/}

        {/*/!* this could be placed at a sidebar*!/*/}
        {/*<div className={`filter-group ${!this.props.isFilterBoxOpen ? 'filter-group-closed' : ''}`}>*/}
        {/*  {*/}
        {/*    this.props.companies.map(( t: Company, id: number ) => {*/}
        {/*      return (<Toggle key={id} value={t.name} toggleTagVisible={this.toggleTagVisibilityOnOwner}/>);*/}
        {/*    })*/}
        {/*  }*/}
        {/*</div>*/}
      </div>
    );
  }
}

const mapStateToProps = ( state: AppState ) => {
  return state.mapState;
};

const mapDispatchToProps = ( dispatch: ThunkDispatch<AppState, void, Action> ) => {
  return {
    toggleSoldYearVisibility: (val: string, isOn: boolean) => dispatch(toggleSoldYearVisibilityAction(val, isOn)),
    togglePublicVisibility: (val: string, isOn: boolean) => dispatch(togglePublicPrivateAllVisibilityAction(val, isOn)),
    toggleTagVisible: ( val: string, isOn: boolean ) => dispatch(toggleTagVisibilityAction(val, isOn)),
    toggleTagVisibilityOnOwner: ( val: string, isOn: boolean ) => dispatch(toggleOwnerVisibilityAction(val, isOn)),
    toggleFilterBoxOpen: () => dispatch(toggleFilterBoxOpenAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterBox);
