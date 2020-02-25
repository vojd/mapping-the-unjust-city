import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { APIService } from '../services/APIService';
import { actionTypes } from './Action';
import { AppState } from '../interfaces/AppState';

export const fetchCentreAction = ( slug: string) => {

  return async(dispatch: ThunkDispatch<AppState, void, Action>) => {
    const apiService = new APIService();
    try {
      const result = await apiService.getCentreBySlug(slug);
      return dispatch({
        type: actionTypes.STATION_FETCHED,
        result
      });
    } catch (e) {
      console.log('error', e);
      return dispatch({
        type: actionTypes.STATION_FETCH_FAILED,
      });
    }
  };
};
