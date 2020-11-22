import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { APIService } from '../services/APIService';
import { actionTypes } from './Action';
import { AppState } from '../interfaces/AppState';

export const fetchCompanyDetailsAction = ( slug: string ) => {
  return async ( dispatch: ThunkDispatch<AppState, void, Action> ) => {
    const apiService = new APIService();
    try {
      const result = await apiService.getCompanyBySlug(slug);
      return dispatch({
        type: actionTypes.COMPANY_DETAILS_FETCHED,
        result
      });
    } catch (e) {
      console.error('error', e);
      return dispatch({
        type: actionTypes.COMPANY_DETAILS_FETCH_FAILED
      });
    }
  };
};
