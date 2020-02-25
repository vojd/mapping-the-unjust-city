import * as React from 'react';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { RouteMatch } from './CentreComponent';
import { Centre } from '../models/models';
import { fetchCentreAction } from '../actions/fetchCentreAction';
import { CentreToolbar } from './CentreToolbar';
import { CentreInformationProps } from './CentreInformation';
import { AppState } from '../interfaces/AppState';

// const TableRow = ( props: any ) => {
//   return (
//     <tr key={props.row.name}>
//       <td>{props.row.year}</td>
//       <td>{props.row.name}</td>
//       <td>{props.row.price}</td>
//       <td>{props.row.currency}</td>
//     </tr>
//   );
// };

export const HistoricalOwner = ( props: any ) => {
  console.log('owner', props.owner.company.name);
  const owner = props.owner;
  return (
    <div>
      <div>{owner.name}</div>
      <div>{owner.year}</div>
      <div>{owner.price} {owner.currency}</div>
    </div>

  );
};

export const OwnershipInformation = ( props: CentreInformationProps ) => {
  if (!props.centre.owner) {
    return null;
  }

  const pageStyle = {
    background: `url(${props.centre.images[0].image})`
  };

  return (
    <div className="row content flex-vertical">
      <div className="station-information__content" style={pageStyle}>
        <div className="content-header">
          <h2>{props.centre.name} ownership history</h2>
        </div>

        {props.centre.historicalOwners.map((owner, idx) => <HistoricalOwner key={idx} owner={owner}/>)}

        <div>
          <p>{props.centre.description}</p>
        </div>
      </div>

      <CentreToolbar centreSlug={props.centre.slug} companySlug={props.centre.owner.slug}/>

      <div/>
    </div>
  );
};

interface OwnershipHistoryProps {
  match: RouteMatch;
  centre: Centre | null;

  fetchCentre: Function;
}

interface OwnershipHistoryState {
  centre: Centre | null;
}

class CentreOwnershipHistoryComponent extends React.Component<OwnershipHistoryProps, OwnershipHistoryState> {

  constructor( props: OwnershipHistoryProps ) {
    super(props);
    const slug = props.match.params.slug;
    console.log(props);
    props.fetchCentre(slug);
  }

  render() {
    return (
      this.props.centre ? <OwnershipInformation centre={this.props.centre}/> : ''
    );
  }
}

// To avoid warnings when state.centre is null
const mapStateToProps = ( state: AppState ) => state.centre ? state.centre : {};

const mapDispatchToProps = ( dispatch: ThunkDispatch<AppState, void, Action> ) => {
  return {
    fetchCentre: ( slug: string ) => dispatch(fetchCentreAction(slug))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CentreOwnershipHistoryComponent);
