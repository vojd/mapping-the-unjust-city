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
import { setCentreActiveAction, setLangAction } from '../actions/mapActions';

interface RouteParams {
  slug: string;
  lang: string;
}

export interface RouteMatch {
  params: RouteParams;
}

export interface RouteLocation {
  pathname: string;
  search: string;
}

export interface SidebarProps {
  match: RouteMatch;
  location: RouteLocation;
  fetchCentre: Function;
  toggleOpenClose: Function;
  setCentreActive: Function;
  centre: Centre | null;
  lang: string;
  setLang: Function;
}

export interface SidebarState {
  centre: Centre | null;
}

const CentreOwnerName = ( props: any ) => {
  const {owner, lang} = props;
  return (
    <span className="centre-owner-title color-orange">
      <Link to={`/${lang}/map/company/${owner.slug}`} className="centre-owner-name">{owner.name}</Link>
    </span>
  );
};

export const CentreName = ( props: any ) => {
  const {centre, lang} = props;
  const owner = centre && centre.owner ? centre.owner : '';
  return (
    <div className="centre-name">
      <h2>
        {centre ? centre.name : ''}
        {
          owner
            ? <CentreOwnerName owner={owner} lang={lang}/>
            : null
        }
      </h2>
    </div>
  );
};

const AlsoOwned = ( props: any ) => {

  const {centres, lang} = props;
  const {owner} = props;
  return (
    <div>
      <div className="headline-text">{owner.name.toLocaleUpperCase()} {trans('owns_the_following', lang)}</div>
      <div>
        {
          centres.map(( other: any, idx: number ) => {
            return (
              <div key={idx} className="company-also-owns">
                <Link to={`/${lang}/map/centre/${other.slug}`} className="centre-owner-name">
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
  const {obj, lang} = props;
  if (obj && obj.description) {
    let val = lang === 'se' ? obj.description : obj.descriptionEn;
    return (
      <HTMLOutput str={val} />
    );
  }
  return null;
};

const CentreHome = ( props: any ) => {
  const {centre, lang} = props;
  const owner = centre ? centre.owner : null;
  const centres = centre && centre.owner ? centre.owner.centres : [];

  return (
    <div>
      <CentreName centre={centre} lang={lang}/>
      <div className="headline-text">{trans('about_centre', lang)}</div>

      <div>
         <DescriptionTranslated obj={centre} lang={lang}/>
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
  const {centre, lang} = props;
  const {detailPlans} = centre;

  return (
    <div>
      <CentreName centre={centre} lang={lang}/>
      <div className="headline-text">{trans('zoning_plan', lang)}</div>

      {
        detailPlans && detailPlans.length > 0
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
          : trans('zoning_plans_coming_soon', lang)
      }
    </div>

  );
};

export interface TheProps {
  centre: Centre;
  lang: string;
}

const CentreOwners = ( props: TheProps ) => {
  const {centre, lang} = props;

  return (
    <div>
      <CentreName centre={centre} lang={lang}/>
      <div className="headline-text">{trans('owner_history', lang)}</div>
      {
        centre.historicalOwners.length > 0 ?
          <table className="table">
        <thead>
        <tr>
          <th scope="col">{trans('company', lang)}</th>
          <th scope="col">{trans('year', lang)}</th>

        </tr>
        </thead>
        <tbody>
        {
          centre.historicalOwners.map(( owner: any, id: number ) => {
            return (
              <tr key={id}>
                <td>
                  <Link to={`${lang}/map/company/${owner.company.slug}`}>
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

      <DescriptionTranslated obj={centre} lang={lang}/>

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

class Sidebar extends React.Component<SidebarProps, SidebarState> {
  constructor( props: SidebarProps ) {
    super(props);
  }

  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.fetchCentre(slug);
    this.props.setLang(this.props.match.params.lang);
  }

  componentDidUpdate( previousProps: SidebarProps ) {
    if (previousProps.location.pathname !== this.props.location.pathname) {
      const slug = this.props.match.params.slug;
      this.props.fetchCentre(slug);
    }
  }

  render() {
    const slug = this.props.match.params.slug;
    const lang = this.props.match.params.lang;
    console.log('sidebar lang', lang);
    return (
      <div className="sidebar">
        <div className="sidebar-content shadow">
          <div>
            <div className="centre-top-image">
              {this.props.centre ? <CentreMainImage centre={this.props.centre}/> : ''}
            </div>

            <div>
              <div className="centre_information__menu">

                <NavLink exact={true} activeClassName="link-is-active" to={`/${lang}/map/centre/${slug}`}>
                  <div className="station-information__menu__icon icon icon-house"/>
                </NavLink>

                <NavLink activeClassName="link-is-active" to={`/${lang}/map/centre/${slug}/detail-plan`}>
                  <div className="station-information__menu__icon icon icon-detail-plan"/>
                </NavLink>

                <NavLink activeClassName="link-is-active" to={`/${lang}/map/centre/${slug}/owners`}>
                  <div className="station-information__menu__icon icon icon-owner-history"/>
                </NavLink>

                <NavLink activeClassName="link-is-active" to={`/${lang}/map/centre/${slug}/documents`}>
                  <div className="station-information__menu__icon icon icon-media-press"/>
                </NavLink>
              </div>
            </div>

            <div className="centre-main">
              <Switch>
                <Route
                  exact
                  path="/:lang/map/centre/:slug"
                  render={() =>
                    <CentreHome
                      centre={this.props.centre}
                      lang={lang}
                    />
                  }
                />
                <Route
                  path="/:lang/map/centre/:slug/detail-plan"
                  render={() => {
                    return this.props.centre ? <CentreDetailPlan centre={this.props.centre} lang={lang}/> : '';
                  }}
                />

                <Route
                  path="/:lang/map/centre/:slug/owners"
                  render={() => {
                    return this.props.centre ? <CentreOwners centre={this.props.centre} lang={lang}/> : '';
                  }}
                />

                <Route
                  path="/:lang/map/centre/:slug/documents"
                  render={() => {
                    return this.props.centre
                      ? <CentreDocuments centre={this.props.centre} lang={lang}/>
                      : '';
                  }}
                />
              </Switch>
            </div>
          </div>
        </div>

        <SidebarClose lang={lang}/>
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
    setLang: (lang: string) => dispatch(setLangAction(lang)),
    setActiveCentre: (node: MapNode) => dispatch(setCentreActiveAction(node)),
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar));
