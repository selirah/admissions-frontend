import { Reducer } from 'redux';
import { FeesState, FeesActionTypes } from './types';
import { AuthActionTypes } from '../auth';
import { constants } from '../../helpers/constants';

export const initialState: FeesState = {
  isSubmitting: false,
  error: undefined,
  success: false,
  failure: false,
  fees: [],
  page: '',
  loading: false,
  isDeleting: false,
  deleteSuccess: false,
};

const reducer: Reducer<FeesState> = (state = initialState, action) => {
  switch (action.type) {
    case FeesActionTypes.CREATE_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        error: undefined,
        success: false,
        failure: false,
      };
    case FeesActionTypes.CREATE_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        success: true,
        failure: false,
        page: constants.fees,
        fees: [action.payload, ...state.fees],
      };
    case FeesActionTypes.CREATE_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        success: false,
        failure: true,
        error: action.payload,
        page: constants.fees,
      };
    case FeesActionTypes.DELETE_REQUEST:
      return {
        ...state,
        isDeleting: true,
        error: undefined,
        deleteSuccess: false,
      };
    case FeesActionTypes.DELETE_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        fees: state.fees.filter((fee) => fee.id !== action.payload),
        deleteSuccess: true,
        page: constants.fees,
      };
    case FeesActionTypes.DELETE_FAILURE:
      return {
        ...state,
        isDeleting: false,
        error: action.payload,
        deleteSuccess: false,
        page: constants.fees,
      };

    case FeesActionTypes.GET_FEES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FeesActionTypes.GET_FEES_SUCCESS:
      return {
        ...state,
        loading: false,
        fees: action.payload,
      };

    case FeesActionTypes.GET_FEES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FeesActionTypes.CLEAR_BOOLEAN_STATES:
      return {
        ...state,
        success: false,
        failure: false,
        deleteSuccess: false,
      };
    case FeesActionTypes.CLEAR_DATA:
      return {
        ...state,
        fees: [],
      };
    case AuthActionTypes.DESTROY_STATES:
      return initialState;
    default:
      return state;
  }
};

export { reducer as feesReducer };
