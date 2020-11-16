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
import { trans } from '../trans';
import { SidebarClose } from './SidebarClose';
import { MapNode } from './UndergroundLines';
import { setCentreActiveAction } from '../actions/mapActions';

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
  setCentreActive: Function;
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

const AlsoOwned = ( props: any ) => {

  const {centres} = props;
  const {owner} = props;
  return (
    <div>
      <div className="headline-text">{owner.name.toLocaleUpperCase()} {trans('owns_the_following', 'en')}</div>
      <div>
        {
          centres.map(( other: any, idx: number ) => {
            return (
              <div key={idx} className="company-also-owns">
                <Link to={`/centre/${other.slug}`} className="centre-owner-name">
                  {other.name}
                </Link>
              </div>
            );
          })
        }
      </div>
    </div>

  );
};

export const HTMLOutput = (props: { str: string }) => {
  let {str} = props;

  return (
    <span>
      {
        str.split(/\r\n|\n/g).map((s: string, i: number) => {
          return (
            <p key={i}>
              {s}
            </p>
          );
        })
      }
    </span>
  );
};

export const DescriptionTranslated = (props: any) => {
  let {obj} = props;
  if (obj && obj.description) {
    let val = obj.descriptionEn !== '' ? obj.descriptionEn : obj.description;
    console.log('val', val);
    return (
      <HTMLOutput str={val} />
    );
  }
  return null;
};

const CentreHome = ( props: any ) => {
  const {centre} = props;
  const owner = centre ? centre.owner : null;
  const centres = centre && centre.owner ? centre.owner.centres : [];
  const description = centre ? (centre.descriptionEn === '' ? centre.description : centre.descriptionEn) : '';
  return (
    <div>
      <CentreName centre={centre}/>
      <div className="headline-text">{trans('about_centre', 'en')}</div>

      <div>
         <HTMLOutput str={description} />
      </div>

      {owner && centres ? <AlsoOwned centres={centres} owner={owner}/> : ''}

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
      <div className="headline-text">{trans('zoning_plan', 'en')}</div>

      {
        detailPlans
          ? detailPlans.map(( plan: any, idx: number ) => {
            return (
              <div key={idx}>
                <div className="detail-plan-description">
                  <p>{plan.description}</p>
                </div>

                <div className="sidebar-inline-image">
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
      <div className="headline-text">{trans('owner_history', 'en')}</div>
      {
        centre.historicalOwners.length > 0 ?
          <table className="table">
        <thead>
        <tr>
          <th scope="col">{trans('company', 'en')}</th>
          <th scope="col">{trans('year', 'en')}</th>

        </tr>
        </thead>
        <tbody>
        {
          centre.historicalOwners.map(( owner: any, id: number ) => {
            return (
              <tr key={id}>
                <td>
                  <Link to={`/company/${owner.company.slug}`}>
                    {owner.company.name}
                  </Link>
                </td>
                <td>{owner.year}</td>

              </tr>
            );
          })
        }
        </tbody>
      </table>
          : null
      }
      {
        centre.ownershipDescriptionEn
          ? <div>{centre.ownershipDescriptionEn}</div>
          : <div>{centre.ownershipDescription}</div>
      }
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
    console.log('sidebar opened');
  }

  componentDidUpdate( previousProps: SidebarProps ) {
    if (previousProps.location.pathname !== this.props.location.pathname) {
      const slug = this.props.match.params.slug;
      this.props.fetchCentre(slug);
      console.log('sidebar componentDidUpdate');
      // this.props.setCentreActive(this.props.centre);
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

        <SidebarClose />
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
    setActiveCentre: (node: MapNode) => dispatch(setCentreActiveAction(node)),
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar));
