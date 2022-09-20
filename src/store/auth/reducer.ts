import { Reducer } from 'redux';
import { AuthState, AuthActionTypes } from './types';
import { constants } from '../../helpers/constants';

export const initialState: AuthState = {
  isAuthenticated: false,
  isSubmitting: false,
  error: undefined,
  success: false,
  failure: false,
  user: undefined,
  page: '',
  passwordChange: false,
  passwordChangeFailure: false,
  passwordChangeSuccess: false,
};

const reducer: Reducer<AuthState> = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.SUBMIT_REGISTER_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        error: undefined,
        success: false,
        failure: false,
      };
    case AuthActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        success: true,
        failure: false,
        user: action.payload,
        page: constants.register,
      };
    case AuthActionTypes.REGISTER_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        success: false,
        failure: true,
        error: action.payload,
        page: constants.register,
      };
    case AuthActionTypes.SUBMIT_LOGIN_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        error: undefined,
        success: false,
        failure: false,
      };
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        user: action.payload,
        isAuthenticated: true,
        success: true,
        failure: false,
        page: constants.login,
      };
    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        error: action.payload,
        success: false,
        failure: true,
        page: constants.login,
      };
    case AuthActionTypes.SUBMIT_VERIFICATION_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        error: undefined,
        success: false,
        failure: false,
      };
    case AuthActionTypes.VERIFICATION_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        success: true,
        failure: false,
        page: constants.verify,
      };

    case AuthActionTypes.VERIFICATION_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        error: action.payload,
        success: false,
        failure: true,
        page: constants.verify,
      };
    case AuthActionTypes.SUBMIT_RESEND_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        error: undefined,
        success: false,
        failure: false,
      };
    case AuthActionTypes.RESEND_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        success: true,
        failure: false,
        page: constants.resend,
      };

    case AuthActionTypes.RESEND_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        error: action.payload,
        success: false,
        failure: true,
        page: constants.resend,
      };
    case AuthActionTypes.SUBMIT_RESET_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        error: undefined,
        success: false,
        failure: false,
      };
    case AuthActionTypes.RESET_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        success: true,
        failure: false,
        page: constants.reset,
      };

    case AuthActionTypes.RESET_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        error: action.payload,
        success: false,
        failure: true,
        page: constants.reset,
      };
    case AuthActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case AuthActionTypes.CLEAR_AUTH_STATES:
      return {
        ...state,
        success: false,
        failure: false,
        error: undefined,
        isSubmitting: false,
        passwordChange: false,
        passwordChangeFailure: false,
        passwordChangeSuccess: false,
      };
    case AuthActionTypes.UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        error: undefined,
        success: false,
        failure: false,
      };
    case AuthActionTypes.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        success: true,
        failure: false,
        user: {
          name: action.payload.name,
          phone: action.payload.phone,
          email: action.payload.email,
          admin_id: state.user?.admin_id,
          created_at: state.user?.created_at,
          email_verified_at: state.user?.email_verified_at,
          id: state.user?.id,
          is_revoke: state.user?.is_revoke,
          is_verified: state.user?.is_verified,
          password: state.user?.password,
          role: state.user?.role,
          school_id: state.user?.school_id,
          token: state.user?.token,
          updated_at: state.user?.updated_at,
        },
        page: constants.profile,
      };
    case AuthActionTypes.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        success: false,
        failure: true,
        error: action.payload,
        page: constants.profile,
      };
    case AuthActionTypes.CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        passwordChange: true,
        error: undefined,
        passwordChangeSuccess: false,
        passwordChangeFailure: false,
      };
    case AuthActionTypes.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        passwordChange: false,
        passwordChangeSuccess: true,
        passwordChangeFailure: false,
        page: constants.changePassword,
      };
    case AuthActionTypes.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        passwordChange: false,
        passwordChangeSuccess: false,
        passwordChangeFailure: true,
        error: action.payload,
        page: constants.changePassword,
      };
    case AuthActionTypes.CLEAR_DATA:
      return {
        ...state,
        user: undefined,
      };
    case AuthActionTypes.DESTROY_STATES:
      return initialState;
    default:
      return state;
  }
};

export { reducer as authReducer };
