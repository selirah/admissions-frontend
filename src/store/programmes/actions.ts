import { action } from 'typesafe-actions';
import { Programme } from '../../interfaces';
import { ProgrammesActionTypes } from './types';

export const createRequest = (payload: Programme) =>
  action(ProgrammesActionTypes.CREATE_REQUEST, payload);

export const createSuccess = (programme: Programme) =>
  action(ProgrammesActionTypes.CREATE_SUCCESS, programme);

export const createFailure = (error: any) =>
  action(ProgrammesActionTypes.CREATE_FAILURE, error);

export const updateRequest = (payload: Programme) =>
  action(ProgrammesActionTypes.UPDATE_REQUEST, payload);

export const updateSuccess = (data: Programme) =>
  action(ProgrammesActionTypes.UPDATE_SUCCESS, data);

export const updateFailure = (error: any) =>
  action(ProgrammesActionTypes.UPDATE_FAILURE, error);

export const deleteRequest = (payload: number) =>
  action(ProgrammesActionTypes.DELETE_REQUEST, payload);

export const deleteSuccess = (data: number) =>
  action(ProgrammesActionTypes.DELETE_SUCCESS, data);

export const deleteFailure = (error: any) =>
  action(ProgrammesActionTypes.DELETE_FAILURE, error);

export const getProgrammesRequest = (payload: any) =>
  action(ProgrammesActionTypes.GET_PROGRAMMES_REQUEST, payload);

export const getProgrammesSuccess = (data: Programme[]) =>
  action(ProgrammesActionTypes.GET_PROGRAMMES_SUCCESS, data);

export const getProgrammesFailure = (error: any) =>
  action(ProgrammesActionTypes.GET_PROGRAMMES_FAILURE, error);

export const clearBooleanStates = () =>
  action(ProgrammesActionTypes.CLEAR_BOOLEAN_STATES);

export const clearProgrammes = () => action(ProgrammesActionTypes.CLEAR_DATA);
