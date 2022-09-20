import { Client } from '../../interfaces';

export enum AdminActionTypes {
  SUBMITTING = '@@admin/SUBMITTING',
  GET_CLIENTS_REQUEST = '@@admin/GET_CLIENTS_REQUEST',
  GET_CLIENTS_SUCCESS = '@@admin/GET_CLIENTS_SUCCESS',
  GET_CLIENTS_FAILURE = '@@admin/GET_CLIENTS_REQUEST',
  CLEAR_BOOLEAN_STATES = '@@admin/CLEAR_BOOLEAN_STATES',
  IMPERSONATE_REQUEST = '@@admin/IMPERSONATE_REQUEST',
  IMPERSONATE_SUCCESS = '@@admin/IMPERSONATE_SUCCESS',
  IMPERSONATE_FAILURE = '@@admin/IMPERSONATE_FAILURE',
  SWITCH_ADMIN_REQUEST = '@@admin/SWITCH_ADMIN_REQUEST',
  SWITCH_ADMIN_SUCCESS = '@@admin/SWITCH_ADMIN_SUCCESS',
  SWITCH_ADMIN_FAILURE = '@@admin/IMPERSONATE_FAILURE',
  SWITCH_MENU = '@@admin/SWITCH_MENU',
}

export type AdminState = {
  readonly isSubmitting: boolean;
  readonly clients: Client[];
  readonly error: any;
  readonly loading: boolean;
  readonly isImpersonating: boolean;
  readonly impersonateSuccess: boolean;
  readonly impersonateFailure: boolean;
  readonly switchAdminSuccess: boolean;
  readonly switchAdminFailure: boolean;
  readonly switching: boolean;
  readonly page: string;
  readonly activMenu: string;
};
