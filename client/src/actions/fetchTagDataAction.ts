import { actionTypes } from './Action';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { APIService } from '../services/APIService';
import { AppState } from '../interfaces/AppState';

export const fetchTagDataAction = () => {

  return async ( dispatch: ThunkDispatch<AppState, void, Action> ) => {
    const apiService = new APIService();
    try {
      const result = await apiService.getTags();

      return dispatch({
        type: actionTypes.TAG_DATA_FETCHED,
        result
      });
    } catch (e) {
      return dispatch({
        type: actionTypes.TAG_DATA_FETCH_FAILED
      });
    }
  };
};
