import { Reducer } from 'redux'
import { ProgrammesState, ProgrammesActionTypes } from './types'
import { AuthActionTypes } from '../auth'
import { constants } from '../../helpers/constants'

export const initialState: ProgrammesState = {
  isSubmitting: false,
  error: undefined,
  success: false,
  failure: false,
  programmes: [],
  page: '',
  loading: false,
  isDeleting: false,
  deleteSuccess: false
}

const reducer: Reducer<ProgrammesState> = (state = initialState, action) => {
  switch (action.type) {
    case ProgrammesActionTypes.CREATE_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        error: undefined,
        success: false,
        failure: false
      }
    case ProgrammesActionTypes.CREATE_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        success: true,
        failure: false,
        page: constants.programmes,
        programmes: [action.payload, ...state.programmes]
      }
    case ProgrammesActionTypes.CREATE_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        success: false,
        failure: true,
        error: action.payload,
        page: constants.programmes
      }
    case ProgrammesActionTypes.UPDATE_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        error: undefined,
        success: false,
        failure: false
      }
    case ProgrammesActionTypes.UPDATE_SUCCESS:
      let programmes = state.programmes.slice()
      programmes = programmes.filter(
        (programme) => programme.id !== action.payload.id
      )
      programmes.unshift(action.payload)
      return {
        ...state,
        isSubmitting: false,
        programmes: programmes,
        success: true,
        failure: false,
        page: constants.programmes
      }
    case ProgrammesActionTypes.UPDATE_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        error: action.payload,
        success: false,
        failure: true,
        page: constants.programmes
      }
    case ProgrammesActionTypes.DELETE_REQUEST:
      return {
        ...state,
        isDeleting: true,
        error: undefined,
        deleteSuccess: false
      }
    case ProgrammesActionTypes.DELETE_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        programmes: state.programmes.filter(
          (programme) => programme.id !== action.payload
        ),
        deleteSuccess: true,
        page: constants.programmes
      }
    case ProgrammesActionTypes.DELETE_FAILURE:
      return {
        ...state,
        isDeleting: false,
        error: action.payload,
        deleteSuccess: false,
        page: constants.programmes
      }

    case ProgrammesActionTypes.GET_PROGRAMMES_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ProgrammesActionTypes.GET_PROGRAMMES_SUCCESS:
      return {
        ...state,
        loading: false,
        programmes: action.payload
      }

    case ProgrammesActionTypes.GET_PROGRAMMES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case ProgrammesActionTypes.CLEAR_BOOLEAN_STATES:
      return {
        ...state,
        success: false,
        failure: false,
        deleteSuccess: false
      }
    case ProgrammesActionTypes.CLEAR_DATA:
      return {
        ...state,
        programmes: []
      }
    case AuthActionTypes.DESTROY_STATES:
      return initialState
    default:
      return state
  }
}

export { reducer as programmesReducer }
