import { combineReducers } from 'redux';
import stationReducer from './stationReducer';
import { AppState } from '../state/AppState';

export default combineReducers<AppState>({
  centre: stationReducer,
});
