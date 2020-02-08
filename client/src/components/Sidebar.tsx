import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../state/AppState';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { Centre } from '../models/models';
import { RouteLocation, RouteMatch } from './CentreComponent';
import { fetchCentreAction } from '../actions/fetchCentreAction';
import { Route, Switch, withRouter } from 'react-router';

export interface SidebarProps {
  match: RouteMatch;
  location: RouteLocation;
  fetchCentre: Function;
  centre: Centre | null;
}

export interface SidebarState {
  centre: Centre | null;
}

const CentreHome = ( props: any ) => {
  console.log(props);

  return (
    <div>HOME</div>
  );
};

const CentreDetailPlan = ( props: any ) => {
  console.log(props);
  return (
    <div>CENTRE DETAIL PLAN</div>
  );
};

const CentreOwners = ( props: any ) => {
  console.log(props);
  return (
    <div>CENTRE OWNERS</div>
  );
};

class Sidebar extends React.Component<SidebarProps, SidebarState> {
  constructor( props: SidebarProps ) {
    super(props);
  }

  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.fetchCentre(slug);
  }

  componentDidUpdate( previousProps: SidebarProps ) {
    if (previousProps.location.pathname !== this.props.location.pathname) {
      const slug = this.props.match.params.slug;
      this.props.fetchCentre(slug);
      console.log('componentDidUpdate');
    }
  }

  render() {
    return (
      <div className="sidebar">
        <div>
          <Switch>
            <Route exact path="/centre/:slug" component={CentreHome}/>
            <Route path="/centre/:slug/detail-plan" component={CentreDetailPlan}/>
            <Route path="/centre/:slug/owners" component={CentreOwners}/>
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ( state: AppState, {params}: any ) => {
  const {centre} = state;
  if (centre) {
    return {...state, centre: centre.centre};
  } else {
    return {...state};
  }
};

const mapDispatchToProps = ( dispatch: ThunkDispatch<AppState, void, Action> ) => {
  return {
    fetchCentre: ( slug: string ) => dispatch(fetchCentreAction(slug)),
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar));
