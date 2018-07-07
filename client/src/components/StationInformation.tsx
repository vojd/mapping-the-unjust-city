import * as React from 'react';
import { MapNode } from './UndergroundLines';
import { HttpService } from '../services/HttpService';
import { CentreInformation } from '../models/models';
import { Link } from 'react-router-dom';

interface StationInformationProps {
  node: MapNode;
}

interface StationInformationState {
  stationInformation: {
    owner: string;
  };
}

export class StationInformation extends React.Component<StationInformationProps, StationInformationState> {

  httpService: HttpService;

  constructor(props: any) {
    super(props);

    this.state = {
      stationInformation: {
        owner: ''
      }
    };

    this.httpService = new HttpService();
    this.httpService
      .get<CentreInformation>(props.node.name)
      .then(result => {
        this.setState({
          stationInformation: result
        });
      });
  }

  render() {
    return (
      <div className="full-screen">

        <div className="flex-vertical">
          <div className="height-two-thirds">

            <div className="flex-vertical">
              <div>
                <h2>{this.props.node.name}</h2>
                <h4>
                  Ägare:
                  <u>
                    <Link to={`/station-detail/${this.state.stationInformation}`}>
                      {this.state.stationInformation ? this.state.stationInformation.owner : null}
                    </Link>
                  </u>
                </h4>

                <span>
                  <p>Centrumbyggnader. Torg på allmän platsmark.</p>
                </span>
              </div>

              <div className="station-information__toolbar">
                <div className="station-information__toolbar__icon">
                  <i className="fas fa-users"/>
                </div>

                <div className="station-information__toolbar__icon">
                  <i className="fas fa-coins"/>
                </div>

                <div className="station-information__toolbar__icon">
                  <i className="fas fa-map"/>
                </div>

                <div className="station-information__toolbar__icon">
                  <i className="fas fa-question"/>
                </div>
              </div>

            </div>
          </div>

          <div className="height-one-third">
            <p>bottom area</p>
          </div>
        </div>

      </div>
    );
  }
}

const stationInformation = StationInformation;
console.log(stationInformation);
