import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../state/AppState';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { Centre } from '../models/models';
import { RouteLocation, RouteMatch } from './CentreComponent';
import { fetchCentreAction } from '../actions/fetchCentreAction';
import { Route, Switch, withRouter } from 'react-router';
import { Link } from 'react-router-dom';

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
  const {centre} = props;

  return (
    <div>{centre ? centre.name : ''}</div>
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

const CentreDocuments = ( props: any ) => {
  console.log('documents', props);
  return (
    <div>CENTRE DOCUMENTS</div>
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
    const slug = this.props.match.params.slug;
    return (
      <div className="sidebar shadow">
        <div>
          <div className="centre_top_image">
            IMAGE
          </div>

          <div>
            <div className="centre_information__menu">
              <Link to={`/centre/${slug}`}>
                <div className="station-information__menu__icon">
                  <i className="fas fa-users"/>
                </div>
              </Link>

              {/*Detaljplan*/}
              <Link to={`/centre/${slug}/detail-plan`}>
                <div className="station-information__menu__icon">
                  <i className="fas fa-map"/>
                </div>
              </Link>

              <Link to={`/centre/${slug}/owners`}>
                <div className="station-information__menu__icon">
                  <i className="fas fa-coins"/>
                </div>
              </Link>
              <Link to={`/centre/${slug}/documents`}>
                <div className="station-information__menu__icon">
                  <i className="fas fa-question"/>
                </div>
              </Link>
            </div>
          </div>

          <div className="centre_main">
            <Switch>
              <Route exact path="/centre/:slug" render={() => <CentreHome centre={this.props.centre}/>}/>
              <Route path="/centre/:slug/detail-plan" component={CentreDetailPlan}/>
              <Route path="/centre/:slug/owners" component={CentreOwners}/>
              <Route path="/centre/:slug/documents" component={CentreDocuments}/>
            </Switch>
          </div>
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
