import { Action } from 'redux';
import { actionTypes } from '../actions/Action';
import { Centre } from '../models/models';
import { AppState } from '../state/AppState';

// TODO: Rename to CentreAction etc ...
interface StationAction extends Action {
  result: Centre;
}

export default ( state: AppState, action: StationAction ) => {
  switch (action.type) {
    case actionTypes.STATION_FETCHED:
      console.log('station fetched');
      return {...state, centre: action.result};
    default:
      return null;
  }
};
