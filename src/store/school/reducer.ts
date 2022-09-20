import { Reducer } from 'redux';
import { SchoolState, SchoolActionTypes } from './types';
import { AuthActionTypes } from '../auth';
import { constants } from '../../helpers/constants';

export const initialState: SchoolState = {
  isSubmitting: false,
  error: undefined,
  success: false,
  failure: false,
  categories: [],
  school: null,
  schools: [],
  page: '',
  loading: false,
  logoSuccess: false,
  signatureSuccess: false,
  submitLogo: false,
  submitSignature: false,
};

const reducer: Reducer<SchoolState> = (state = initialState, action) => {
  switch (action.type) {
    case SchoolActionTypes.CREATE_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        error: undefined,
        success: false,
        failure: false,
      };
    case SchoolActionTypes.CREATE_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        success: true,
        failure: false,
        page: constants.school,
        school: action.payload,
      };
    case SchoolActionTypes.CREATE_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        success: false,
        failure: true,
        error: action.payload,
        page: constants.school,
      };
    case SchoolActionTypes.UPDATE_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        error: undefined,
        success: false,
        failure: false,
      };
    case SchoolActionTypes.UPDATE_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        school: action.payload,
        success: true,
        failure: false,
        page: constants.school,
      };
    case SchoolActionTypes.UPDATE_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        error: action.payload,
        success: false,
        failure: true,
        page: constants.school,
      };
    case SchoolActionTypes.GET_SCHOOL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SchoolActionTypes.GET_SCHOOL_SUCCESS:
      return {
        ...state,
        loading: false,
        school: action.payload,
      };
    case SchoolActionTypes.GET_SCHOOL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SchoolActionTypes.SET_SCHOOL:
      return {
        ...state,
        school: action.payload,
      };
    case SchoolActionTypes.GET_SCHOOLS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SchoolActionTypes.GET_SCHOOLS_SUCCESS:
      return {
        ...state,
        loading: false,
        schools: action.payload,
      };
    case SchoolActionTypes.GET_SCHOOLS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SchoolActionTypes.GET_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SchoolActionTypes.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    case SchoolActionTypes.GET_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SchoolActionTypes.CLEAR_BOOLEAN_STATES:
      return {
        ...state,
        success: false,
        failure: false,
        logoSuccess: false,
        signatureSuccess: false,
      };
    case SchoolActionTypes.ADD_LOGO_REQUEST:
      return {
        ...state,
        submitLogo: true,
        error: undefined,
        logoSuccess: false,
      };
    case SchoolActionTypes.ADD_LOGO_SUCCESS:
      return {
        ...state,
        submitLogo: false,
        school: action.payload,
        logoSuccess: true,
        page: constants.school,
      };
    case SchoolActionTypes.ADD_LOGO_FAILURE:
      return {
        ...state,
        submitLogo: false,
        error: action.payload,
        logoSuccess: false,
        page: constants.school,
      };
    case SchoolActionTypes.ADD_SIGNATURE_REQUEST:
      return {
        ...state,
        submitSignature: true,
        error: undefined,
        signatureSuccess: false,
      };
    case SchoolActionTypes.ADD_SIGNATURE_SUCCESS:
      return {
        ...state,
        submitSignature: false,
        school: action.payload,
        signatureSuccess: true,
        page: constants.school,
      };
    case SchoolActionTypes.ADD_SIGNATURE_FAILURE:
      return {
        ...state,
        submitSignature: false,
        error: action.payload,
        signatureSuccess: false,
        page: constants.school,
      };
    case SchoolActionTypes.CLEAR_DATA:
      return {
        ...state,
        school: null,
        schools: [],
      };
    case AuthActionTypes.DESTROY_STATES:
      return initialState;
    default:
      return state;
  }
};

export { reducer as schoolReducer };
