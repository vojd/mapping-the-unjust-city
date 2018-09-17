import * as React from 'react';
import { Link } from 'react-router-dom';
import { APIService } from '../services/APIService';
import { Centre, CentreResponse, createCentre } from '../models/models';
import { Map } from '../pages/Map';

interface RouteParams {
  slug: string;
}

interface RouteMatch {
  params: RouteParams;
}

interface CentreComponentProps {
  match: RouteMatch;
}

interface CentreComponentState {
  centre: Centre | null;
}

interface CentreInformationProps {
  centre: Centre;
}

/**
 * Main page for a station
 */
export const CentreInformation = (props: CentreInformationProps) => {
  const pageBackground = {
    //tslint:disable
    backgroundImage: 'http://lokaler.citycon.se/system/images/W1siZiIsIjIwMTUvMDEvMDkvMTBfNDVfMzBfNjUwX3N0b2NraG9sbV8xMjk1MF9mcnVhbmdzZ2FuZ2VuX3V1c2lfY2l0eWNvbl8yLmpwZyJdLFsicCIsImNvbnZlcnQiLCItc3RyaXAgLWludGVybGFjZSBQbGFuZSAtcXVhbGl0eSA4MCUiLG51bGxdLFsicCIsInRodW1iIiwiNzk4eCJdXQ/stockholm_12950_fruangsgangen_uusi_citycon_2.jpg'
  };
  return (
    <div className="full-screen centre-information">

      <div className="flex-vertical">
        {/*centre information*/}
        <div className="height-two-thirds" style={pageBackground}>

          <div className="flex-vertical">

            <div className="station-information__content">
              <h2>{props.centre.name}</h2>
              <p>Ägare: {props.centre.owner ? props.centre.owner.name : 'N/A'}</p>

              <div>
                <p>{props.centre.description}</p>
              </div>
            </div>

            <div className="station-information__toolbar">
              <Link to={`/company/${props.centre.owner ? props.centre.owner.slug : ''}`}>
                <div className="station-information__toolbar__icon">
                  <i className="fas fa-users"/>
                </div>
              </Link>

              <Link to={`/centre/${props.centre.slug}/ownership-history`}>
                <div className="station-information__toolbar__icon">
                  <i className="fas fa-coins"/>
                </div>
              </Link>

              {/*Detaljplan*/}
              <Link to={`/centre/${props.centre.slug}/detailed`}>
                <div className="station-information__toolbar__icon">
                  <i className="fas fa-map"/>
                </div>
              </Link>

              <Link to={`/centre/${props.centre.slug}/media-archive`}>
                <div className="station-information__toolbar__icon">
                  <i className="fas fa-question"/>
                </div>
              </Link>
            </div>

          </div>
        </div>

        {/*lower mini map*/}
        <div className="height-one-third">
          <Map />
        </div>
      </div>

    </div>
  );
};

export class CentreComponent extends React.Component<CentreComponentProps, CentreComponentState> {

  apiService: APIService;

  constructor(props: CentreComponentProps) {
    super(props);
    this.state = {
      centre: null
    };

    this.apiService = new APIService();
    this.fetchAndSetState(props.match.params.slug);
  }

  render() {
    return (
      this.state.centre ? <CentreInformation centre={this.state.centre}/> : ''
    );
  }

  private fetchAndSetState = (centreName: string) => {
    this.apiService
      .getCentreBySlug<CentreResponse>(centreName)
      .then(centreResponse => {

        if (centreResponse) {
          this.setState({
            centre: createCentre(centreResponse)
          });
        }
      })
      .catch(reason => {
        console.log('failed', reason);
      });
  }
}
