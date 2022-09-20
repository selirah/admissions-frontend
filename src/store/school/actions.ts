import { action } from 'typesafe-actions';
import { School, Category } from '../../interfaces';
import { SchoolActionTypes } from './types';

export const createRequest = (payload: School) =>
  action(SchoolActionTypes.CREATE_REQUEST, payload);

export const createSuccess = (school: School) =>
  action(SchoolActionTypes.CREATE_SUCCESS, school);

export const createFailure = (error: any) =>
  action(SchoolActionTypes.CREATE_FAILURE, error);

export const updateRequest = (payload: School) =>
  action(SchoolActionTypes.UPDATE_REQUEST, payload);

export const updateSuccess = (data: School) =>
  action(SchoolActionTypes.UPDATE_SUCCESS, data);

export const updateFailure = (error: any) =>
  action(SchoolActionTypes.UPDATE_FAILURE, error);

export const getSchoolRequest = () =>
  action(SchoolActionTypes.GET_SCHOOL_REQUEST);

export const getSchoolSuccess = (data: School | null) =>
  action(SchoolActionTypes.GET_SCHOOL_SUCCESS, data);

export const getSchoolFailure = (error: any) =>
  action(SchoolActionTypes.GET_SCHOOL_FAILURE, error);

export const getSchoolsRequest = () =>
  action(SchoolActionTypes.GET_SCHOOLS_REQUEST);

export const getSchoolsSuccess = (data: School[]) =>
  action(SchoolActionTypes.GET_SCHOOLS_SUCCESS, data);

export const getSchoolsFailure = (error: any) =>
  action(SchoolActionTypes.GET_SCHOOLS_FAILURE, error);

export const getCategoriesRequest = () =>
  action(SchoolActionTypes.GET_CATEGORIES_REQUEST);

export const getCategoriesSuccess = (data: Category[]) =>
  action(SchoolActionTypes.GET_CATEGORIES_SUCCESS, data);

export const getCategoriesFailure = (error: any) =>
  action(SchoolActionTypes.GET_CATEGORIES_FAILURE, error);

export const addLogoRequest = (payload: any) =>
  action(SchoolActionTypes.ADD_LOGO_REQUEST, payload);

export const addLogoSuccess = (school: School) =>
  action(SchoolActionTypes.ADD_LOGO_SUCCESS, school);

export const addLogoFailure = (error: string) =>
  action(SchoolActionTypes.ADD_LOGO_FAILURE, error);

export const addSignatureRequest = (payload: any) =>
  action(SchoolActionTypes.ADD_SIGNATURE_REQUEST, payload);

export const addSignatureSuccess = (school: School) =>
  action(SchoolActionTypes.ADD_SIGNATURE_SUCCESS, school);

export const addSignatureFailure = (error: any) =>
  action(SchoolActionTypes.ADD_SIGNATURE_FAILURE, error);

export const setSchoolLogo = (logo: string) =>
  action(SchoolActionTypes.SET_SCHOOL_LOGO, logo);

export const clearBooleanStates = () =>
  action(SchoolActionTypes.CLEAR_BOOLEAN_STATES);

export const clearSchool = () => action(SchoolActionTypes.CLEAR_DATA);
