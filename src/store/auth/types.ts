import { User } from '../../interfaces';

export enum AuthActionTypes {
  SUBMITTING = '@@auth/SUBMITTING',
  SUBMIT_REGISTER_REQUEST = '@@auth/SUBMIT_REGISTER_REQUEST',
  REGISTER_SUCCESS = '@@auth/REGISTER_SUCCESS',
  REGISTER_FAILURE = '@@auth/REGISTER_FAILURE',
  SUBMIT_LOGIN_REQUEST = '@@auth/SUBMIT_LOGIN_REQUEST',
  LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS',
  LOGIN_FAILURE = '@@auth/LOGIN_FAILURE',
  SET_USER = '@@auth/SET_USER',
  RESET_ERROR_STATE = '@@auth/RESET_ERROR_STATE',
  DESTROY_STATES = '@@auth/DESTROY_STATES',
  SUBMIT_VERIFICATION_REQUEST = '@@auth/SUBMIT_VERIFICATION_REQUEST',
  VERIFICATION_SUCCESS = '@@auth/VERIFICATION_SUCCESS',
  VERIFICATION_FAILURE = '@@auth/VERIFICATION_FAILURE',
  SUBMIT_RESEND_REQUEST = '@@auth/SUBMIT_RESEND_REQUEST',
  RESEND_SUCCESS = '@@auth/RESEND_SUCCESS',
  RESEND_FAILURE = '@@auth/RESEND_FAILURE',
  SUBMIT_RESET_REQUEST = '@@auth/SUBMIT_RESET_REQUEST',
  RESET_SUCCESS = '@@auth/RESET_SUCCESS',
  RESET_FAILURE = '@@auth/RESET_FAILURE',
  CLEAR_AUTH_STATES = '@@auth/CLEAR_AUTH_STATE',
  UPDATE_PROFILE_REQUEST = '@@auth/UPDATE_PROFILE_REQUEST',
  UPDATE_PROFILE_SUCCESS = '@@auth/UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_FAILURE = '@@auth/UPDATE_PROFILE_FAILURE',
  CHANGE_PASSWORD_REQUEST = '@@auth/CHANGE_PASSWORD_REQUEST',
  CHANGE_PASSWORD_SUCCESS = '@@auth/CHANGE_PASSWORD_SUCCESS',
  CHANGE_PASSWORD_FAILURE = '@@auth/CHANGE_PASSWORD_FAILURE',

  CLEAR_DATA = '@@auth/CLEAR_DATA',
}

export type AuthState = {
  readonly isAuthenticated: boolean;
  readonly isSubmitting: boolean;
  readonly error: any;
  readonly success: boolean;
  readonly failure: boolean;
  readonly user: User | undefined;
  readonly page: string;
  readonly passwordChange: boolean;
  readonly passwordChangeSuccess: boolean;
  readonly passwordChangeFailure: boolean;
};
