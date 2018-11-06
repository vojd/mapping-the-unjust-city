import { Action } from 'redux';
import { actionTypes } from '../actions/Action';
import { MapState } from '../pages/MapComponent';
import { AppState } from '../state/AppState';

interface MapReducer extends Action {
  result: MapState;
}

export default ( state: AppState, action: MapReducer ) => {
  switch (action.type) {
    case actionTypes.MAP_MOUSE_DOWN:
      console.log('map mouse down');
      return {...state, mapState: {...state.mapState, isMoving: true}};
    case actionTypes.MAP_MOUSE_UP:
      console.log('map mouse up');
      return {...state, mapState: {...state.mapState, isMoving: false}};
    default:
      return null;
  }
};
