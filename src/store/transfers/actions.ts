import { action } from 'typesafe-actions'
import { Transfer } from '../../interfaces'
import { TransfersActionTypes } from './types'

export const createRequest = (payload: any) =>
  action(TransfersActionTypes.CREATE_REQUEST, payload)

export const createSuccess = (transfer: Transfer) =>
  action(TransfersActionTypes.CREATE_SUCCESS, transfer)

export const createFailure = (error: any) =>
  action(TransfersActionTypes.CREATE_FAILURE, error)

export const deleteRequest = (payload: number) =>
  action(TransfersActionTypes.DELETE_REQUEST, payload)

export const deleteSuccess = (data: number) =>
  action(TransfersActionTypes.DELETE_SUCCESS, data)

export const deleteFailure = (error: any) =>
  action(TransfersActionTypes.DELETE_FAILURE, error)

export const getTransfersRequest = (payload: any) =>
  action(TransfersActionTypes.GET_TRANSFERS_REQUEST, payload)

export const getTransfersSuccess = (data: Transfer[]) =>
  action(TransfersActionTypes.GET_TRANSFERS_SUCCESS, data)

export const getTransfersFailure = (error: any) =>
  action(TransfersActionTypes.GET_TRANSFERS_FAILURE, error)

export const transferActionRequest = (payload: any) =>
  action(TransfersActionTypes.ACTION_REQUEST, payload)

export const transferActionSuccess = () =>
  action(TransfersActionTypes.ACTION_SUCCESS)

export const transferActionFailure = (error: any) =>
  action(TransfersActionTypes.ACTION_FAILURE, error)

export const clearBooleanStates = () =>
  action(TransfersActionTypes.CLEAR_BOOLEAN_STATES)

export const clearTransfers = () => action(TransfersActionTypes.CLEAR_DATA)

export const createTransferDuplicateRequest = (payload: any) =>
  action(TransfersActionTypes.TRANSFER_DUPLICATE_STUDENTS_REQUEST, payload)

export const createTransferDuplicateSuccess = () =>
  action(TransfersActionTypes.TRANSFER_DUPLICATE_STUDENTS_SUCCESS)

export const createTransferDuplicateFailure = (error: any) =>
  action(TransfersActionTypes.TRANSFER_DUPLICATE_STUDENTS_FAILURE, error)

export const exportTransfersRequest = (payload: any) =>
  action(TransfersActionTypes.EXPORT_REQUEST, payload)

export const exportTransfersSuccess = () =>
  action(TransfersActionTypes.EXPORT_SUCCESS)

export const exportTransfersFailure = (error: any) =>
  action(TransfersActionTypes.EXPORT_FAILURE, error)

export const getTransferCountRequest = (payload: any) =>
  action(TransfersActionTypes.GET_TRANSFER_COUNT_REQUEST, payload)

export const getTransferCountSuccess = (data: number) =>
  action(TransfersActionTypes.GET_TRANSFER_COUNT_SUCCESS, data)

export const getTransferCountFailure = (error: any) =>
  action(TransfersActionTypes.GET_TRANSFER_COUNT_FAILURE, error)
