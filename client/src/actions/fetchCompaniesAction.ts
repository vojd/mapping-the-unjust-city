import { actionTypes } from './Action';
import { AppState } from '../state/AppState';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { APIService } from '../services/APIService';

export const fetchCompaniesAction = () => {

  return async ( dispatch: ThunkDispatch<AppState, void, Action> ) => {
    const apiService = new APIService();
    try {
      const result = await apiService.getCompanies();
      console.log('COMPANIESfetched', result);

      return dispatch({
        type: actionTypes.COMPANIES_FETCHED,
        result
      });
    } catch (e) {
      return dispatch({
        type: actionTypes.COMPANIES_FETCHED_FAILED
      });
    }
  };
};
