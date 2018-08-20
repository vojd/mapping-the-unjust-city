import * as React from 'react';
import { MapNode } from './UndergroundLines';
import { Link } from 'react-router-dom';
import { APIService } from '../services/APIService';
import { Centre, CentreResponse, createCentre } from '../models/models';

interface CentreComponentProps {
  node: MapNode;
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
  return (
    <div className="full-screen">

      <div className="flex-vertical">
        <div className="height-two-thirds">

          <div className="flex-vertical">

            <div>
              <h2>{props.centre.name}</h2>
              <p>{props.centre.name}</p>
              <Link to={`something`}>Link</Link>
            </div>

            <div className="station-information__toolbar">
              <Link to={`/company/${props.centre.owner}`}>
                <div className="station-information__toolbar__icon">
                  <i className="fas fa-users"/>
                </div>
              </Link>

              <Link to={`/centre/${props.centre.name}/ownership-history`}>
                <div className="station-information__toolbar__icon">
                  <i className="fas fa-coins"/>
                </div>
              </Link>

              {/*Detaljplan*/}
              <Link to={`/centre/${props.centre.name}/detailed`}>
                <div className="station-information__toolbar__icon">
                  <i className="fas fa-map"/>
                </div>
              </Link>

              <Link to={`/centre/${props.centre.name}/media-archive`}>
                <div className="station-information__toolbar__icon">
                  <i className="fas fa-question"/>
                </div>
              </Link>
            </div>

          </div>
        </div>

        <div className="height-one-third">
          <p>bottom area</p>
        </div>
      </div>

    </div>
  );
};

export class CentreComponent extends React.Component<CentreComponentProps, CentreComponentState> {

  apiService: APIService;

  constructor(props: any) {
    super(props);
    this.state = {
      centre: null
    };

    this.apiService = new APIService();
    this.fetchAndSetState(props.node.name);
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
      });
  }
}
