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
import CentreDocuments from './CentreDocuments';

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

const CentreHome = ( props: any ) => {
  const {centre} = props;
  const owner = centre && centre.owner ? centre.owner.name : '';
  return (
    <div>
      <div className="page-headline">OM CENTRUM</div>
      <h2>{centre ? centre.name : ''} <span className="color-orange">{owner}</span></h2>

      <div>
        {centre ? centre.description : ''}
      </div>
    </div>
  );
};

const CentreDetailPlan = ( props: any ) => {
  console.log(props);
  return (
    <div className="page-headline">DETALJPLAN</div>
  );
};

export interface TheProps {
  centre: Centre;
}

const CentreOwners = ( props: TheProps ) => {
  const {centre: centre} = props;

  return (
    <div>
      <div className="page-headline">ÄGARHISTORIK</div>
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
            {this.props.centre ? <CentreMainImage centre={this.props.centre}/> : ''}
          </div>

          <div>
            <div className="centre_information__menu">

              {/*Detaljplan*/}

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
          </div>

          <div className="centre-main">
            <Switch>
              <Route exact path="/centre/:slug" render={() => <CentreHome centre={this.props.centre}/>}/>
              <Route path="/centre/:slug/detail-plan" component={CentreDetailPlan}/>
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
