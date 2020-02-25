import { Action } from 'redux';
import { actionTypes } from '../actions/Action';
import { Centre } from '../models/models';
import { AppState } from '../interfaces/AppState';

interface CentreAction extends Action {
  result: Centre;
}

export default ( state: AppState, action: CentreAction ) => {
  switch (action.type) {
    case actionTypes.STATION_FETCHED:
      console.log('actionTypes.STATION_FETCHED centre fetched', action.result);
      return {...state, centre: action.result};

    case actionTypes.DOCUMENTS_FETCHED:
      console.log('reducer actionTypes.DOCUMENTS_FETCHED', action);
      return state;

    default:
      return state || null;
  }
};
