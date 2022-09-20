import { Programme } from '../../interfaces';

export enum ProgrammesActionTypes {
  SUBMITTING = '@@programmes/SUBMITTING',
  CREATE_REQUEST = '@@programmes/CREATE_REQUEST',
  CREATE_SUCCESS = '@@programmes/CREATE_SUCCESS',
  CREATE_FAILURE = '@@programmes/CREATE_FAILURE',
  UPDATE_REQUEST = '@@programmes/UPDATE_REQUEST',
  UPDATE_SUCCESS = '@@programmes/UPDATE_SUCCESS',
  UPDATE_FAILURE = '@@programmes/UPDATE_FAILURE',
  DELETE_REQUEST = '@@programmes/DELETE_REQUEST',
  DELETE_SUCCESS = '@@programmes/DELETE_SUCCESS',
  DELETE_FAILURE = '@@programmes/DELETE_FAILURE',
  GET_PROGRAMMES_REQUEST = '@@programmes/GET_PROGRAMMES_REQUEST',
  GET_PROGRAMMES_SUCCESS = '@@programmes/GET_PROGRAMMES_SUCCESS',
  GET_PROGRAMMES_FAILURE = '@@programmes/GET_PROGRAMMES_FAILURE',
  CLEAR_BOOLEAN_STATES = '@@programmes/CLEAR_BOOLEAN_STATES',
  CLEAR_DATA = '@@programmes/CLEAR_DATA',
}

export type ProgrammesState = {
  readonly isSubmitting: boolean;
  readonly programmes: Programme[];
  readonly error: any;
  readonly success: boolean;
  readonly failure: boolean;
  readonly page: string;
  readonly loading: boolean;
  readonly isDeleting: boolean;
  readonly deleteSuccess: boolean;
};
