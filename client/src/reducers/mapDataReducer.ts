import { Action } from 'redux';
import { Centre } from '../models/models';
import { AppState } from '../state/AppState';

interface MapDataAction extends Action {
  result: Centre[];
}

export default ( state: AppState, action: MapDataAction ) => {
  switch (action.type) {
    default:
      return null;
  }
};
