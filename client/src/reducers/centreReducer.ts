import { Action } from 'redux';
import { actionTypes } from '../actions/Action';
import { Centre } from '../models/models';
import { AppState } from '../state/AppState';

interface CentreAction extends Action {
  result: Centre;
}

export default ( state: AppState, action: CentreAction ) => {
  switch (action.type) {
    case actionTypes.STATION_FETCHED:
      console.log('actionTypes.STATION_FETCHED centre fetched', action.result);
      return {...state, centre: action.result};
    default:
      return state || null;
  }
};
