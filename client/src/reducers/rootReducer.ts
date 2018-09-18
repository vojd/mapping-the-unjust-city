import { combineReducers } from 'redux';
import stationReducer from './stationReducer';
import { AppState } from '../state/AppState';
import companyReducer from './companyReducer';

export default combineReducers<AppState>({
  centre: stationReducer,
  company: companyReducer
});
