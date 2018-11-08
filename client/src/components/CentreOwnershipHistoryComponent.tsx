import * as React from 'react';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../state/AppState';
import { connect } from 'react-redux';
import { RouteMatch } from './CentreComponent';
import { Centre } from '../models/models';
import { positionFixed } from '../react-styles/styles';

interface OwnershipHistoryProps {
  match: RouteMatch;
  centre: Centre | null;
}

interface OwnershipHistoryState {
  centre: Centre | null;
}

const TableRow = ( props: any ) => {
  return (
    <tr key={props.row.name}>
      <td>{props.row.year}</td>
      <td>{props.row.name}</td>
      <td>{props.row.price}</td>
      <td>{props.row.currency}</td>
    </tr>
  );
};

class CentreOwnershipHistoryComponent extends React.Component<OwnershipHistoryProps, OwnershipHistoryState> {

  constructor( props: OwnershipHistoryProps ) {
    super(props);
    console.log('constructed');
  }

  render() {
    return (
      <div className="full-screen" style={positionFixed}>
        <div className="content-header">
          <h2>ÄGARHISTORIK</h2>
        </div>

        <div className="content flex-vertical">
          <div className="content-padded">
            <table>
              <tbody>
              {
                this.props.centre
                  ? this.props.centre.historicalOwners.map(( oh ) => <TableRow row={oh} key={oh.name}/>)
                  : null
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ( state: AppState ) => state.centre;

const mapDispatchToProps = ( dispatch: ThunkDispatch<AppState, void, Action> ) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CentreOwnershipHistoryComponent);
