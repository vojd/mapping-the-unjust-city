import { Action } from 'redux';
import { Centre } from '../models/models';
import { AppState } from '../state/AppState';
import { actionTypes } from '../actions/Action';

interface MapDataAction extends Action {
  result: Centre[];
}

export default ( state: AppState, action: MapDataAction ) => {
  switch (action.type) {
    case actionTypes.MAP_DATA_FETCHED:
      console.log('MAP_DATA_FETCHED');
      return { ...state, };
    default:
      return null;
  }
};
