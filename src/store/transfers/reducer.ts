import { Reducer } from 'redux'
import { TransfersState, TransfersActionTypes } from './types'
import { AuthActionTypes } from '../auth'
import { constants } from '../../helpers/constants'

export const initialState: TransfersState = {
  actionFailure: false,
  actionSuccess: false,
  deleteSuccess: false,
  error: undefined,
  failure: false,
  isDeleting: false,
  isSubmitting: false,
  page: '',
  performAction: false,
  success: false,
  transfers: [],
  loading: false,
  exporting: false,
  exportFailure: false,
  exportSuccess: false,
  transferCount: 0
}

const reducer: Reducer<TransfersState> = (state = initialState, action) => {
  switch (action.type) {
    case TransfersActionTypes.CREATE_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        error: null,
        success: false,
        failure: false
      }
    case TransfersActionTypes.CREATE_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        success: true,
        failure: false,
        page: constants.transfers,
        transfers: [action.payload, ...state.transfers]
      }
    case TransfersActionTypes.CREATE_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        success: false,
        failure: true,
        error: action.payload,
        page: constants.transfers
      }
    case TransfersActionTypes.DELETE_REQUEST:
      return {
        ...state,
        isDeleting: true,
        error: null,
        deleteSuccess: false
      }
    case TransfersActionTypes.DELETE_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        transfers: state.transfers.filter(
          (transfer) => transfer.id !== action.payload
        ),
        deleteSuccess: true,
        page: constants.transfers
      }
    case TransfersActionTypes.DELETE_FAILURE:
      return {
        ...state,
        isDeleting: false,
        error: action.payload,
        deleteSuccess: false,
        page: constants.transfers
      }
    case TransfersActionTypes.GET_TRANSFERS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case TransfersActionTypes.GET_TRANSFERS_SUCCESS:
      return {
        ...state,
        loading: false,
        transfers: action.payload
      }
    case TransfersActionTypes.GET_TRANSFERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case TransfersActionTypes.ACTION_REQUEST:
      return {
        ...state,
        performAction: true,
        error: undefined
      }
    case TransfersActionTypes.ACTION_SUCCESS:
      return {
        ...state,
        performAction: false,
        actionSuccess: true,
        actionFailure: false,
        page: constants.transfers
      }
    case TransfersActionTypes.ACTION_FAILURE:
      return {
        ...state,
        performAction: false,
        actionFailure: true,
        actionSuccess: false,
        error: action.payload,
        page: constants.transfers
      }
    case TransfersActionTypes.CLEAR_BOOLEAN_STATES:
      return {
        ...state,
        success: false,
        failure: false,
        deleteSuccess: false,
        isSubmitting: false,
        isDeleting: false,
        error: undefined,
        performAction: false,
        actionFailure: false,
        actionSuccess: false,
        exporting: false,
        exportFailure: false,
        exportSuccess: false
      }
    case TransfersActionTypes.CLEAR_DATA:
      return {
        ...state,
        transfers: []
      }
    case TransfersActionTypes.TRANSFER_DUPLICATE_STUDENTS_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        error: null,
        success: false,
        failure: false
      }
    case TransfersActionTypes.TRANSFER_DUPLICATE_STUDENTS_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        success: true,
        failure: false,
        page: constants.transfers
      }
    case TransfersActionTypes.TRANSFER_DUPLICATE_STUDENTS_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        success: false,
        failure: true,
        error: action.payload,
        page: constants.transfers
      }
    case TransfersActionTypes.EXPORT_REQUEST:
      return {
        ...state,
        exporting: true,
        error: undefined
      }

    case TransfersActionTypes.EXPORT_SUCCESS:
      return {
        ...state,
        exporting: false,
        exportSuccess: true,
        exportFailure: false,
        page: constants.transfers
      }

    case TransfersActionTypes.EXPORT_FAILURE:
      return {
        ...state,
        exporting: false,
        exportFailure: true,
        exportSuccess: false,
        error: action.payload,
        page: constants.transfers
      }
    case TransfersActionTypes.GET_TRANSFER_COUNT_REQUEST:
      return {
        ...state
      }

    case TransfersActionTypes.GET_TRANSFER_COUNT_SUCCESS:
      return {
        ...state,
        page: constants.transfers,
        transferCount: parseInt(action.payload)
      }

    case TransfersActionTypes.GET_TRANSFER_COUNT_FAILURE:
      return {
        ...state,
        error: action.payload,
        page: constants.transfers
      }
    case AuthActionTypes.DESTROY_STATES:
      return initialState
    default:
      return state
  }
}

export { reducer as transfersReducer }
