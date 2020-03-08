import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { Centre } from '../models/models';
import { fetchCentreAction } from '../actions/fetchCentreAction';
import { Route, Switch, withRouter } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import CentreDocuments from './CentreDocuments';
import { AppState } from '../interfaces/AppState';

interface RouteParams {
  slug: string;
}

export interface RouteMatch {
  params: RouteParams;
}

export interface RouteLocation {
  pathname: string;
}

export interface SidebarProps {
  match: RouteMatch;
  location: RouteLocation;
  fetchCentre: Function;
  toggleOpenClose: Function;
  centre: Centre | null;
}

export interface SidebarState {
  centre: Centre | null;
}

const CentreOwnerName = ( props: any ) => {
  const {owner} = props;
  return (
    <span className="centre-owner-title color-orange">
      <Link to={`/company/${owner.slug}`} className="centre-owner-name">{owner.name}</Link>
    </span>
  );
};

export const CentreName = ( props: any ) => {
  const {centre} = props;
  const owner = centre && centre.owner ? centre.owner : '';
  return (
    <div className="centre-name">
      <h2>
        {centre ? centre.name : ''}
        {
          owner
            ? <CentreOwnerName owner={owner}/>
            : null
        }
      </h2>
    </div>
  );
};

const CentreHome = ( props: any ) => {
  const {centre} = props;
  return (
    <div>
      <CentreName centre={centre}/>
      <div className="headline-text">OM CENTRUM</div>

      <div>
        {centre ? centre.description : ''}
      </div>
    </div>
  );
};

const documentTypeStr = ( document: string ) => {
  const s = document.split('.');
  return s[s.length - 1];
};

const CentreDetailPlan = ( props: any ) => {
  const {centre} = props;
  const {detailPlans} = centre;

  return (
    <div>
      <CentreName centre={centre}/>
      <div className="headline-text">DETALJPLAN</div>

      {
        detailPlans
          ? detailPlans.map(( plan: any, idx: number ) => {
            return (
              <div key={idx}>
                <div className="detail-plan-description">
                  <p>{plan.description}</p>
                </div>

                <div className="detail-plan-image">
                  <img src={plan.image}/>
                </div>

                <div className="detail-plan-document">
                  <a href={plan.document}>Document [ {documentTypeStr(plan.document)} ]</a>
                </div>
              </div>
            );
          })
          : ';'
      }
    </div>

  );
};

export interface TheProps {
  centre: Centre;
}

const CentreOwners = ( props: TheProps ) => {
  const {centre} = props;

  return (
    <div>
      <CentreName centre={centre}/>
      <div className="headline-text">ÄGARHISTORIK</div>

      <table className="table">
        <thead>
        <tr>
          <th scope="col"> Företag</th>
          <th scope="col">År</th>

        </tr>
        </thead>
        <tbody>
        {
          centre.historicalOwners.map(( owner: any, id: number ) => {
            return (
              <tr key={id}>
                <td>{owner.company.name}</td>
                <td>{owner.year}</td>

              </tr>
            );
          })
        }
        </tbody>
      </table>
    </div>
  );
};

const CentreMainImage = ( props: any ) => {
  const {centre} = props;
  const {images} = centre;
  const imageSrc = images && images.length > 0 ? images[0].image : '';

  const componentStyles = {
    backgroundImage: `url(${imageSrc})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  };

  // TODO: Add placeholder image for stations without image(s)
  return (
    <div style={componentStyles} className="centre-top-image">
      <div className="centre-top-title">&nbsp;</div>
    </div>
  );
};

class Sidebar extends React.Component
  <SidebarProps, SidebarState> {
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
      console.log('sidebar componentDidUpdate');
    }
  }

  render() {
    const slug = this.props.match.params.slug;
    return (
      <div className="sidebar">
        <div className="sidebar-content shadow">
          <div>
            <div className="centre-top-image">
              {this.props.centre ? <CentreMainImage centre={this.props.centre}/> : ''}
            </div>

            <div>
              <div className="centre_information__menu">

                <NavLink exact={true} activeClassName="link-is-active" to={`/centre/${slug}`}>
                  <div className="station-information__menu__icon icon icon-house"/>
                </NavLink>

                <NavLink activeClassName="link-is-active" to={`/centre/${slug}/detail-plan`}>
                  <div className="station-information__menu__icon icon icon-detail-plan"/>
                </NavLink>

                <NavLink activeClassName="link-is-active" to={`/centre/${slug}/owners`}>
                  <div className="station-information__menu__icon icon icon-owner-history"/>
                </NavLink>

                <NavLink activeClassName="link-is-active" to={`/centre/${slug}/documents`}>
                  <div className="station-information__menu__icon icon icon-media-press"/>
                </NavLink>
              </div>
            </div>

            <div className="centre-main">
              <Switch>
                <Route exact path="/centre/:slug" render={() => <CentreHome centre={this.props.centre}/>}/>
                <Route
                  path="/centre/:slug/detail-plan"
                  render={() => {
                    return this.props.centre ? <CentreDetailPlan centre={this.props.centre}/> : '';
                  }}
                />

                <Route
                  path="/centre/:slug/owners"
                  render={() => {
                    return this.props.centre ? <CentreOwners centre={this.props.centre}/> : '';
                  }}
                />

                <Route
                  path="/centre/:slug/documents"
                  render={() => {
                    return this.props.centre ? <CentreDocuments centre={this.props.centre}/> : '';
                  }}
                />
              </Switch>
            </div>
          </div>
        </div>

        {/* close button */}
        <div className="sidebar-close">
          <Link to="/">
            <div className="arrow fa fa-angle-left"/>
          </Link>
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
    return state;
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
