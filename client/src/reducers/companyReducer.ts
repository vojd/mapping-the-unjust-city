import { AppState } from '../state/AppState';
import { Company } from '../models/models';
import { Action } from 'redux';
import { actionTypes } from '../actions/Action';

interface CompanyDetailAction extends Action {
  result: Company;
}

export default ( state: AppState, action: CompanyDetailAction ) => {
  switch (action.type) {
    case actionTypes.COMPANY_DETAILS_FETCHED:
      return {...state, company: action.result};
    default:
      return state || null;
  }
};
