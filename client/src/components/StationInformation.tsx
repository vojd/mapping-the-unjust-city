import * as React from 'react';
import { MapNode } from './UndergroundLines';
import { HttpService } from '../services/HttpService';
import { CentreInformation } from '../models/models';

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
      <div>
        <h4>{this.props.node.name}</h4>
        <p>{this.state.stationInformation ? this.state.stationInformation.owner : null}</p>
      </div>
    );
  }
}

const stationInformation = StationInformation;
console.log(stationInformation);
