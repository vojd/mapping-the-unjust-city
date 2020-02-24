import { AppState } from '../state/AppState';
import { combineReducers } from 'redux';
import mapReducer from './mapReducer';
import centreReducer from './centreReducer';
import companyReducer from './companyReducer';

export default combineReducers<AppState>({
  centre: centreReducer,
  company: companyReducer,
  mapState: mapReducer,
});
