import { Reducer } from 'redux'
import { StudentsState, StudentsActionTypes } from './types'
import { AuthActionTypes } from '../auth'
import { constants } from '../../helpers/constants'

export const initialState: StudentsState = {
  isSubmitting: false,
  error: undefined,
  success: false,
  failure: false,
  students: [],
  page: '',
  loading: false,
  isDeleting: false,
  deleteSuccess: false,
  actionFailure: false,
  actionSuccess: false,
  performAction: false,
  studentAction: false,
  studentActionFailure: false,
  studentActionSuccess: false,
  upload: false,
  uploadFailure: false,
  uploadSuccess: false,
  uploadMessage: undefined,
  exporting: false,
  exportFailure: false,
  exportSuccess: false,
  duplicates: [],
  receiptsStudents: []
}

const reducer: Reducer<StudentsState> = (state = initialState, action) => {
  switch (action.type) {
    case StudentsActionTypes.CREATE_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        error: null,
        success: false,
        failure: false
      }
    case StudentsActionTypes.CREATE_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        success: true,
        failure: false,
        page: constants.students,
        students: [action.payload, ...state.students]
      }
    case StudentsActionTypes.CREATE_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        success: false,
        failure: true,
        error: action.payload,
        page: constants.students
      }
    case StudentsActionTypes.UPDATE_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        error: null,
        success: false,
        failure: false
      }
    case StudentsActionTypes.UPDATE_SUCCESS:
      let students = state.students.slice()
      students = students.filter((student) => student.id !== action.payload.id)
      students.unshift(action.payload)
      return {
        ...state,
        isSubmitting: false,
        students: students,
        success: true,
        failure: false,
        page: constants.students
      }
    case StudentsActionTypes.UPDATE_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        error: action.payload,
        success: false,
        failure: true,
        page: constants.students
      }
    case StudentsActionTypes.DELETE_REQUEST:
      return {
        ...state,
        isDeleting: true,
        error: null,
        deleteSuccess: false
      }
    case StudentsActionTypes.DELETE_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        students: state.students.filter(
          (student) => student.id !== action.payload
        ),
        deleteSuccess: true,
        page: constants.students
      }
    case StudentsActionTypes.DELETE_FAILURE:
      return {
        ...state,
        isDeleting: false,
        error: action.payload,
        deleteSuccess: false,
        page: constants.students
      }

    case StudentsActionTypes.GET_STUDENTS_REQUEST:
      return {
        ...state,
        loading: true
      }

    case StudentsActionTypes.GET_STUDENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        students: action.payload
      }

    case StudentsActionTypes.GET_STUDENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case StudentsActionTypes.STUDENTS_ACTION_REQUEST:
      return {
        ...state,
        performAction: true,
        error: undefined
      }

    case StudentsActionTypes.STUDENTS_ACTION_SUCCESS:
      return {
        ...state,
        performAction: false,
        actionSuccess: true,
        actionFailure: false,
        page: constants.students
      }

    case StudentsActionTypes.STUDENTS_ACTION_FAILURE:
      return {
        ...state,
        performAction: false,
        actionFailure: true,
        actionSuccess: false,
        error: action.payload,
        page: constants.students
      }

    case StudentsActionTypes.ACTION_REQUEST:
      return {
        ...state,
        studentAction: true,
        error: undefined
      }

    case StudentsActionTypes.ACTION_SUCCESS:
      return {
        ...state,
        studentAction: false,
        studentActionSuccess: true,
        studentActionFailure: false,
        page: constants.students
      }

    case StudentsActionTypes.ACTION_FAILURE:
      return {
        ...state,
        studentAction: false,
        studentActionFailure: true,
        studentActionSuccess: false,
        error: action.payload,
        page: constants.students
      }

    case StudentsActionTypes.UPLOAD_STUDENTS_REQUEST:
      return {
        ...state,
        upload: true,
        error: undefined
      }

    case StudentsActionTypes.UPLOAD_STUDENTS_SUCCESS:
      return {
        ...state,
        upload: false,
        uploadSuccess: true,
        uploadFailure: false,
        page: constants.students,
        duplicates: action.payload
      }

    case StudentsActionTypes.UPLOAD_STUDENTS_FAILURE:
      return {
        ...state,
        upload: false,
        uploadFailure: true,
        uploadSuccess: false,
        error: action.payload,
        page: constants.students
      }

    case StudentsActionTypes.EXPORT_REQUEST:
      return {
        ...state,
        exporting: true,
        error: undefined
      }

    case StudentsActionTypes.EXPORT_SUCCESS:
      return {
        ...state,
        exporting: false,
        exportSuccess: true,
        exportFailure: false,
        page: constants.students
      }

    case StudentsActionTypes.EXPORT_FAILURE:
      return {
        ...state,
        exporting: false,
        exportFailure: true,
        exportSuccess: false,
        error: action.payload,
        page: constants.students
      }

    case StudentsActionTypes.CLEAR_BOOLEAN_STATES:
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
        studentAction: false,
        studentActionSuccess: false,
        studentActionFailure: false,
        upload: false,
        uploadSuccess: false,
        uploadFailure: false,
        uploadMessage: undefined,
        exporting: false,
        exportFailure: false,
        exportSuccess: false
      }
    case StudentsActionTypes.CLEAR_DATA:
      return {
        ...state,
        students: []
      }
    case StudentsActionTypes.CLEAR_DUPLICATES:
      return {
        ...state,
        duplicates: []
      }

    case StudentsActionTypes.GET_RECEIPT_STUDENTS_REQUEST:
      return {
        ...state
      }

    case StudentsActionTypes.GET_RECEIPT_STUDENTS_SUCCESS:
      return {
        ...state,
        receiptsStudents: action.payload
      }

    case StudentsActionTypes.GET_RECEIPT_STUDENTS_FAILURE:
      return {
        ...state,
        error: action.payload
      }

    case StudentsActionTypes.GET_FEE_STUDENTS_REQUEST:
      return {
        ...state,
        loading: true
      }

    case StudentsActionTypes.GET_FEE_STUDENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        students: action.payload
      }

    case StudentsActionTypes.GET_FEE_STUDENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case AuthActionTypes.DESTROY_STATES:
      return initialState
    default:
      return state
  }
}

export { reducer as studentsReducer }
