import { actionTypes } from './Action';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { APIService } from '../services/APIService';
import { AppState } from '../interfaces/AppState';

export const fetchMapDataAction = () => {

  return async ( dispatch: ThunkDispatch<AppState, void, Action> ) => {
    const apiService = new APIService();
    try {
      const result = await apiService.getMapData();
      return dispatch({
        type: actionTypes.MAP_DATA_FETCHED,
        result
      });
    } catch (e) {
      console.error('error', e);
      return dispatch({
        type: actionTypes.MAP_DATA_FETCH_FAILED,
      });
    }
  };
};
