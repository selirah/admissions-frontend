import { action } from 'typesafe-actions';
import { Fee } from '../../interfaces';
import { FeesActionTypes } from './types';

export const createRequest = (payload: Fee) =>
  action(FeesActionTypes.CREATE_REQUEST, payload);

export const createSuccess = (fee: Fee) =>
  action(FeesActionTypes.CREATE_SUCCESS, fee);

export const createFailure = (error: any) =>
  action(FeesActionTypes.CREATE_FAILURE, error);

export const deleteRequest = (payload: number) =>
  action(FeesActionTypes.DELETE_REQUEST, payload);

export const deleteSuccess = (data: number) =>
  action(FeesActionTypes.DELETE_SUCCESS, data);

export const deleteFailure = (error: any) =>
  action(FeesActionTypes.DELETE_FAILURE, error);

export const getFeesRequest = (payload: Fee) =>
  action(FeesActionTypes.GET_FEES_REQUEST, payload);

export const getFeesSuccess = (data: Fee[]) =>
  action(FeesActionTypes.GET_FEES_SUCCESS, data);

export const getFeesFailure = (error: any) =>
  action(FeesActionTypes.GET_FEES_FAILURE, error);

export const clearBooleanStates = () =>
  action(FeesActionTypes.CLEAR_BOOLEAN_STATES);

export const clearFees = () => action(FeesActionTypes.CLEAR_DATA);
