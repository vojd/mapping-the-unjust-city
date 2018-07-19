import * as React from 'react';
import { MapNode } from './UndergroundLines';
import { Link } from 'react-router-dom';
import { APIService } from '../services/APIService';
import { Centre, Company } from '../models/models';

interface CentreInformationProps {
  node: MapNode;
}

interface CentreInformationState {
  centre: {
    owner: {
      name: string;
      slug: string;
    };
  };
}

const CentreOwnerInformation = (props: { owner: Company }) => {
  return (
    <div>
      <h4>
        Ägare:
        <u>
          <Link to={`/station-detail/${props.owner.slug}`}>
            {props.owner.name ? props.owner.name : ''}
          </Link>
        </u>
      </h4>

      <span>
        <p>Centrumbyggnader. Torg på allmän platsmark.</p>
      </span>
    </div>
  );
};

export class CentreInformation extends React.Component<CentreInformationProps, CentreInformationState> {

  apiService: APIService;

  constructor(props: any) {
    super(props);

    this.state = {
      centre: {
        owner: {
          name: '',
          slug: ''
        },
      }
    };

    this.apiService = new APIService();
    this.apiService
      .getCentreBySlug<Centre>(props.node.name)
      .then(result => {
        this.setState({
          centre: result
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
                {
                  this.state.centre && this.state.centre.owner &&
                  <CentreOwnerInformation owner={this.state.centre.owner}/>
                }
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

const centreInformation = CentreInformation;
console.log(centreInformation);
