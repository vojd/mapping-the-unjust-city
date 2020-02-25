import { combineReducers } from 'redux';
import mapReducer from './mapReducer';
import centreReducer from './centreReducer';
import companyReducer from './companyReducer';
import { AppState } from '../interfaces/AppState';

export default combineReducers<AppState>({
  centre: centreReducer,
  company: companyReducer,
  mapState: mapReducer,
});
