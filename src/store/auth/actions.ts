import { action } from 'typesafe-actions';
import {
  Login,
  Register,
  User,
  Verification,
  ResendReset,
} from '../../interfaces';
import { AuthActionTypes } from './types';

export const loginRequest = (payload: Login) =>
  action(AuthActionTypes.SUBMIT_LOGIN_REQUEST, payload);

export const loginSuccess = (user: User) =>
  action(AuthActionTypes.LOGIN_SUCCESS, user);

export const loginFailure = (error: any) =>
  action(AuthActionTypes.LOGIN_FAILURE, error);

export const registerRequest = (payload: Register) =>
  action(AuthActionTypes.SUBMIT_REGISTER_REQUEST, payload);

export const registerSuccess = (data: string) =>
  action(AuthActionTypes.REGISTER_SUCCESS, data);

export const registerFailure = (error: any) =>
  action(AuthActionTypes.REGISTER_FAILURE, error);

export const resetErrorState = () => action(AuthActionTypes.RESET_ERROR_STATE);

export const setUser = (user: User) => action(AuthActionTypes.SET_USER, user);

export const logout = () => action(AuthActionTypes.DESTROY_STATES);

export const verifyRequet = (payload: Verification) =>
  action(AuthActionTypes.SUBMIT_VERIFICATION_REQUEST, payload);

export const verifySuccess = () => action(AuthActionTypes.VERIFICATION_SUCCESS);

export const verifyFailure = (error: any) =>
  action(AuthActionTypes.VERIFICATION_FAILURE, error);

export const resendRequest = (payload: ResendReset) =>
  action(AuthActionTypes.SUBMIT_RESEND_REQUEST, payload);

export const resendSuccess = () => action(AuthActionTypes.RESEND_SUCCESS);

export const resendFailure = (error: any) =>
  action(AuthActionTypes.RESEND_FAILURE, error);

export const resetRequest = (payload: ResendReset) =>
  action(AuthActionTypes.SUBMIT_RESET_REQUEST, payload);

export const resetSuccess = () => action(AuthActionTypes.RESET_SUCCESS);

export const resetFailure = (error: any) =>
  action(AuthActionTypes.RESET_FAILURE, error);

export const clearAuthState = () => action(AuthActionTypes.CLEAR_AUTH_STATES);

export const clearUser = () => action(AuthActionTypes.CLEAR_DATA);

export const updateProfileRequest = (payload: any) =>
  action(AuthActionTypes.UPDATE_PROFILE_REQUEST, payload);

export const updateProfileSuccess = (data: User) =>
  action(AuthActionTypes.UPDATE_PROFILE_SUCCESS, data);

export const updateProfileFailure = (error: any) =>
  action(AuthActionTypes.UPDATE_PROFILE_FAILURE, error);

export const changePasswordRequest = (payload: any) =>
  action(AuthActionTypes.CHANGE_PASSWORD_REQUEST, payload);

export const changePasswordSuccess = () =>
  action(AuthActionTypes.CHANGE_PASSWORD_SUCCESS);

export const changePasswordFailure = (error: any) =>
  action(AuthActionTypes.CHANGE_PASSWORD_FAILURE, error);
