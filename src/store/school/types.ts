import { School, Category } from '../../interfaces';

export enum SchoolActionTypes {
  SUBMITTING = '@@school/SUBMITTING',
  CREATE_REQUEST = '@@school/CREATE_REQUEST',
  CREATE_SUCCESS = '@@school/CREATE_SUCCESS',
  CREATE_FAILURE = '@@school/CREATE_FAILURE',
  GET_SCHOOL_REQUEST = '@@school/GET_SCHOOL_REQUEST',
  GET_SCHOOL_SUCCESS = '@@school/GET_SCHOOL_SUCCESS',
  GET_SCHOOL_FAILURE = '@@school/GET_SCHOOL_FAILURE',
  SET_SCHOOL = '@@school/SET_SCHOOL',
  SET_SCHOOL_LOGO = '@@school/SET_SCHOOL_LOGO',
  UPDATE_REQUEST = '@@school/UPDATE_REQUEST',
  UPDATE_SUCCESS = '@@school/UPDATE_SUCCESS',
  UPDATE_FAILURE = '@@school/UPDATE_FAILURE',
  GET_SCHOOLS_REQUEST = '@@school/GET_SCHOOLS_REQUEST',
  GET_SCHOOLS_SUCCESS = '@@school/GET_SCHOOLS_SUCCESS',
  GET_SCHOOLS_FAILURE = '@@school/GET_SCHOOLS_FAILURE',
  GET_CATEGORIES_REQUEST = '@@school/GET_CATEGORIES_REQUEST',
  GET_CATEGORIES_SUCCESS = '@@school/GET_CATEGORIES_SUCCESS',
  GET_CATEGORIES_FAILURE = '@@school/GET_CATEGORIES_FAILURE',
  ADD_LOGO_REQUEST = '@@school/ADD_LOGO_REQUEST',
  ADD_LOGO_SUCCESS = '@@school/ADD_LOGO_SUCCESS',
  ADD_LOGO_FAILURE = '@@school/ADD_LOGO_FAILURE',
  ADD_SIGNATURE_REQUEST = '@@school/ADD_SIGNATURE_REQUEST',
  ADD_SIGNATURE_SUCCESS = '@@school/ADD_SIGNATURE_SUCCESS',
  ADD_SIGNATURE_FAILURE = '@@school/ADD_SIGNATURE_FAILURE',
  CLEAR_BOOLEAN_STATES = '@@school/CLEAR_BOOLEAN_STATES',
  CLEAR_DATA = '@@school/CLEAR_DATA',
}

export type SchoolState = {
  readonly isSubmitting: boolean;
  readonly school: School | null;
  readonly categories: Category[];
  readonly error: any;
  readonly success: boolean;
  readonly failure: boolean;
  readonly page: string;
  readonly schools: School[];
  readonly loading: boolean;
  readonly submitLogo: boolean;
  readonly submitSignature: boolean;
  readonly logoSuccess: boolean;
  readonly signatureSuccess: boolean;
};
