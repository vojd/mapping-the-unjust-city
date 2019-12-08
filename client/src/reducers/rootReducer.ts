import { combineReducers } from 'redux';
import { AppState } from '../state/AppState';
import stationReducer from './stationReducer';
import companyReducer from './companyReducer';
import currentNodeReducer from './currentNodeReducer';
import mapReducer from './mapReducer';
import mapDataReducer from './mapDataReducer';

export default combineReducers<AppState>({
  mapData: mapDataReducer,
  centre: stationReducer,
  company: companyReducer,
  currentNode: currentNodeReducer,
  mapState: mapReducer,
});
