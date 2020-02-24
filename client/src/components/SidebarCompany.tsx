import * as React from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch, withRouter } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../state/AppState';
import { connect } from 'react-redux';
import { CompanyHome } from './company/CompanyHome';
import { Company } from '../models/models';
import { RouteLocation, RouteMatch } from './CentreComponent';
import { fetchCompanyDetailsAction } from '../actions/fetchCompanyDetailsAction';

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
    console.log('sidebar didmount', this.props);
  }

  componentDidUpdate( previousProps: SidebarCompanyProps ) {
    if (previousProps.location.pathname !== this.props.location.pathname) {
      const slug = this.props.match.params.slug;
      this.props.fetchCompany(slug);
      console.log('sidebar componentDidUpdate', this.props);
    }
  }

  render() {
    const slug = this.props.match.params.slug;
    return (
      <div className="sidebar">
        <div className="sidebar-content shadow">
          <div>
            <div className="centre_top_image">
              {/*{this.props.centre ? <CentreMainImage centre={this.props.centre}/> : ''}*/}
              placeholder
            </div>

            <div>
              <div className="centre_information__menu">

                <Link to={`/centre/${slug}`}>
                  <div className="station-information__menu__icon">
                    <i className="fa fa-question"/>
                  </div>
                </Link>

                <Link to={`/centre/${slug}/detail-plan`}>
                  <div className="station-information__menu__icon">
                    <i className="fa fa-map"/>
                  </div>
                </Link>

                <Link to={`/centre/${slug}/owners`}>
                  <div className="station-information__menu__icon">
                    <i className="fa fa-users"/>
                  </div>
                </Link>

                <Link to={`/centre/${slug}/documents`}>
                  <div className="station-information__menu__icon">
                    <i className="fa fa-question"/>
                  </div>
                </Link>
              </div>

              <p>{this.props.company ? this.props.company.name : ''}</p>
            </div>

            <div className="centre-main">
              <Switch>
                <Route exact path="/company/:slug" render={() => <CompanyHome props={this.props}/>}/>
              </Switch>
            </div>
          </div>
        </div>

        {/* close button */}
        <div className="sidebar-close">
          <Link to="/"><i className="fa fa-angle-left"/></Link>
        </div>
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
