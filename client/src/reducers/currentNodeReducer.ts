import { Action } from 'redux';
import { Centre } from '../models/models';
import { AppState } from '../state/AppState';
import { actionTypes } from '../actions/Action';

interface CurrentNodeReducer extends Action {
  result: Centre;
}

export default ( state: AppState, action: CurrentNodeReducer ) => {
  switch (action.type) {
    case actionTypes.CURRENT_NODE_CHANGED:
      console.log('current node changed');
      return {...state, currentNode: action.result};
    default:
      return null;
  }
};
