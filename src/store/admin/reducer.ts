import { Reducer } from 'redux';
import { AdminState, AdminActionTypes } from './types';
import { AuthActionTypes } from '../auth';
import { constants } from '../../helpers/constants';
import { path } from '../../helpers/path';

export const initialState: AdminState = {
  clients: [],
  error: undefined,
  loading: false,
  isSubmitting: false,
  impersonateFailure: false,
  impersonateSuccess: false,
  isImpersonating: false,
  page: '',
  switchAdminFailure: false,
  switchAdminSuccess: false,
  switching: false,
  activMenu: path.home,
};

const reducer: Reducer<AdminState> = (state = initialState, action) => {
  switch (action.type) {
    case AdminActionTypes.GET_CLIENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AdminActionTypes.GET_CLIENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        clients: action.payload,
      };
    case AdminActionTypes.GET_CLIENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case AdminActionTypes.IMPERSONATE_REQUEST:
      return {
        ...state,
        isImpersonating: true,
      };
    case AdminActionTypes.IMPERSONATE_SUCCESS:
      return {
        ...state,
        isImpersonating: false,
        impersonateSuccess: true,
        impersonateFailure: false,
        page: constants.admin,
      };
    case AdminActionTypes.IMPERSONATE_FAILURE:
      return {
        ...state,
        isImpersonating: false,
        impersonateSuccess: false,
        impersonateFailure: true,
        error: action.payload,
        page: constants.admin,
      };
    case AdminActionTypes.SWITCH_ADMIN_REQUEST:
      return {
        ...state,
        switching: true,
      };
    case AdminActionTypes.SWITCH_ADMIN_SUCCESS:
      return {
        ...state,
        switching: false,
        switchAdminSuccess: true,
        switchAdminFailure: false,
        page: constants.admin,
      };
    case AdminActionTypes.SWITCH_ADMIN_FAILURE:
      return {
        ...state,
        switching: false,
        switchAdminFailure: true,
        switchAdminSuccess: false,
        error: action.payload,
        page: constants.admin,
      };
    case AdminActionTypes.CLEAR_BOOLEAN_STATES:
      return {
        ...state,
        isSubmitting: false,
        isImpersonating: false,
        error: undefined,
        impersonateFailure: false,
        impersonateSuccess: false,
        switchAdminFailure: false,
        switchAdminSuccess: false,
        switching: false,
      };
    case AdminActionTypes.SWITCH_MENU:
      return {
        ...state,
        activMenu: action.payload,
      };
    case AuthActionTypes.DESTROY_STATES:
      return initialState;
    default:
      return state;
  }
};

export { reducer as adminReducer };
