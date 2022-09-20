import { Transfer } from '../../interfaces'

export enum TransfersActionTypes {
  SUBMITTING = '@@transfers/SUBMITTING',
  CREATE_REQUEST = '@@transfers/CREATE_REQUEST',
  CREATE_SUCCESS = '@@transfers/CREATE_SUCCESS',
  CREATE_FAILURE = '@@transfers/CREATE_FAILURE',
  DELETE_REQUEST = '@@transfers/DELETE_REQUEST',
  DELETE_SUCCESS = '@@transfers/DELETE_SUCCESS',
  DELETE_FAILURE = '@@transfers/DELETE_FAILURE',
  GET_TRANSFERS_REQUEST = '@@transfers/GET_TRANSFERS_REQUEST',
  GET_TRANSFERS_SUCCESS = '@@transfers/GET_TRANSFERS_SUCCESS',
  GET_TRANSFERS_FAILURE = '@@transfers/GET_TRANSFERS_FAILURE',
  CLEAR_BOOLEAN_STATES = '@@transfers/CLEAR_BOOLEAN_STATES',
  ACTION_REQUEST = '@@transfers/ACTION_REQUEST',
  ACTION_SUCCESS = '@@transfers/ACTION_SUCCESS',
  ACTION_FAILURE = '@@transfers/ACTION_FAILURE',
  CLEAR_DATA = '@@transfers/CLEAR_DATA',
  TRANSFER_DUPLICATE_STUDENTS_REQUEST = '@@transfers/TRANSFER_DUPLICATE_STUDENTS_REQUEST',
  TRANSFER_DUPLICATE_STUDENTS_SUCCESS = '@@transfers/TRANSFER_DUPLICATE_STUDENTS_SUCCESS',
  TRANSFER_DUPLICATE_STUDENTS_FAILURE = '@@transfers/TRANSFER_DUPLICATE_STUDENTS_FAILURE',
  EXPORT_REQUEST = '@@transfers/EXPORT_REQUEST',
  EXPORT_SUCCESS = '@@transfers/EXPORT_SUCCESS',
  EXPORT_FAILURE = '@@transfers/EXPORT_FAILURE',
  GET_TRANSFER_COUNT_REQUEST = '@@transfers/GET_TRANSFER_COUNT_REQUEST',
  GET_TRANSFER_COUNT_SUCCESS = '@@transfers/GET_TRANSFER_COUNT_SUCCESS',
  GET_TRANSFER_COUNT_FAILURE = '@@transfers/GET_TRANSFER_COUNT_FAILURE'
}

export type TransfersState = {
  readonly isSubmitting: boolean
  readonly transfers: Transfer[]
  readonly error: any
  readonly success: boolean
  readonly failure: boolean
  readonly page: string
  readonly isDeleting: boolean
  readonly deleteSuccess: boolean
  readonly performAction: boolean
  readonly actionSuccess: boolean
  readonly actionFailure: boolean
  readonly loading: boolean
  readonly exporting: boolean
  readonly exportSuccess: boolean
  readonly exportFailure: boolean
  readonly transferCount: number
}
