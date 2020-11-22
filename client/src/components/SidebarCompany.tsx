import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Route, Switch, withRouter } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { CompanyHome } from './company/CompanyHome';
import { Company } from '../models/models';
import { fetchCompanyDetailsAction } from '../actions/fetchCompanyDetailsAction';
import { AppState } from '../interfaces/AppState';
import { CompanyDocuments } from './company/CompanyDocuments';
import { RouteLocation, RouteMatch } from './Sidebar';
import { SidebarClose } from './SidebarClose';

export interface SidebarCompanyProps {
  match: RouteMatch;
  location: RouteLocation;
  fetchCompany: Function;
  company: Company;
}

export interface SidebarCompanyState {
  company: Company | null;
}

class SidebarCompany extends React.Component<SidebarCompanyProps, SidebarCompanyState> {
  constructor( props: SidebarCompanyProps ) {
    super(props);
  }

  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.fetchCompany(slug);
  }

  componentDidUpdate( previousProps: SidebarCompanyProps ) {
    if (previousProps.location.pathname !== this.props.location.pathname) {
      const slug = this.props.match.params.slug;
      this.props.fetchCompany(slug);
    }
  }

  render() {
    const slug = this.props.match.params.slug;
    return (
      <div className="sidebar">
        <div className="sidebar-content border shadow">
          <div>
            <div className="centre-top-image">
              <span className="station-information__menu__icon icon icon-owner-history"/>
            </div>

            <div>
              <div className="centre_information__menu">

                <NavLink exact={true} activeClassName="link-is-active" to={`/map/company/${slug}`}>
                  <div className="station-information__menu__icon icon icon-house"/>
                </NavLink>

                <NavLink activeClassName="link-is-active" to={`/map/company/${slug}/documents`}>
                  <div className="station-information__menu__icon icon icon-media-press"/>
                </NavLink>

              </div>
            </div>

            <div className="centre-main">
              <Switch>
                <Route exact path="/map/company/:slug" render={() => <CompanyHome company={this.props.company}/>}/>
                <Route
                  path="/map/company/:slug/documents"
                  render={() => <CompanyDocuments company={this.props.company}/>}
                />
              </Switch>
            </div>
          </div>
        </div>

        <SidebarClose />
      </div>
    );
  }
}

const mapStateToProps = ( state: AppState, {params}: any ) => {
  const {company} = state;
  if (company) {
    return {...state, company: company.company};
  } else {
    return state;
  }
};

const mapDispatchToProps = ( dispatch: ThunkDispatch<AppState, void, Action> ) => {
  return {
    fetchCompany: ( slug: string ) => dispatch(fetchCompanyDetailsAction(slug)),
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(SidebarCompany));
