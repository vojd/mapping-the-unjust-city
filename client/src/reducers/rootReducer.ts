import { AppState } from '../state/AppState';
import { combineReducers } from 'redux';
import mapReducer from './mapReducer';
import centreReducer from './centreReducer';

export default combineReducers<AppState>({
  centre: centreReducer,
  mapState: mapReducer,
  // company: companyReducer,
});
