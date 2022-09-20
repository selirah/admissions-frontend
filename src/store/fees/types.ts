import { Fee } from '../../interfaces';

export enum FeesActionTypes {
  SUBMITTING = '@@fees/SUBMITTING',
  CREATE_REQUEST = '@@fees/CREATE_REQUEST',
  CREATE_SUCCESS = '@@fees/CREATE_SUCCESS',
  CREATE_FAILURE = '@@fees/CREATE_FAILURE',
  DELETE_REQUEST = '@@fees/DELETE_REQUEST',
  DELETE_SUCCESS = '@@fees/DELETE_SUCCESS',
  DELETE_FAILURE = '@@fees/DELETE_FAILURE',
  GET_FEES_REQUEST = '@@fees/GET_FEES_REQUEST',
  GET_FEES_SUCCESS = '@@fees/GET_FEES_SUCCESS',
  GET_FEES_FAILURE = '@@fees/GET_FEES_FAILURE',
  CLEAR_BOOLEAN_STATES = '@@fees/CLEAR_BOOLEAN_STATES',
  CLEAR_DATA = '@@fees/CLEAR_DATA',
}

export type FeesState = {
  readonly isSubmitting: boolean;
  readonly fees: Fee[];
  readonly error: any;
  readonly success: boolean;
  readonly failure: boolean;
  readonly page: string;
  readonly loading: boolean;
  readonly isDeleting: boolean;
  readonly deleteSuccess: boolean;
};
