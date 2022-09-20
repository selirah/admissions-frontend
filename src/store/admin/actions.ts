import { action } from 'typesafe-actions';
import { Client } from '../../interfaces';
import { AdminActionTypes } from './types';

export const getClientsRequest = (payload: string) =>
  action(AdminActionTypes.GET_CLIENTS_REQUEST, payload);

export const getClientsSuccess = (data: Client[]) =>
  action(AdminActionTypes.GET_CLIENTS_SUCCESS, data);

export const getClientsFailure = (error: any) =>
  action(AdminActionTypes.GET_CLIENTS_FAILURE, error);

export const impersonateRequest = (payload: any) =>
  action(AdminActionTypes.IMPERSONATE_REQUEST, payload);

export const impersonateSuccess = () =>
  action(AdminActionTypes.IMPERSONATE_SUCCESS);

export const impersonateFailure = (error: any) =>
  action(AdminActionTypes.IMPERSONATE_FAILURE, error);

export const switchAdminRequest = (payload: any) =>
  action(AdminActionTypes.SWITCH_ADMIN_REQUEST, payload);

export const switchAdminSuccess = () =>
  action(AdminActionTypes.SWITCH_ADMIN_SUCCESS);

export const switchAdminFailure = (error: any) =>
  action(AdminActionTypes.SWITCH_ADMIN_FAILURE, error);

export const clearBooleanStates = () =>
  action(AdminActionTypes.CLEAR_BOOLEAN_STATES);

export const switchMenu = (menu: string) =>
  action(AdminActionTypes.SWITCH_MENU, menu);
