import { combineReducers } from 'redux';
import stationReducer from './stationReducer';
import { AppState } from '../state/AppState';
import companyReducer from './companyReducer';
import currentNodeReducer from './currentNodeReducer';
import mapReducer from './mapReducer';

export default combineReducers<AppState>({
  centre: stationReducer,
  company: companyReducer,
  currentNode: currentNodeReducer,
  mapState: mapReducer,
});
