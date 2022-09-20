import { Reducer } from 'redux'
import { AcademicsState, ActionTypes } from './types'
import { AuthActionTypes } from '../auth'
import { constants } from '../../helpers/constants'

export const initialState: AcademicsState = {
  isSubmitting: false,
  error: null,
  uploadCoursesSuccess: false,
  uploadCoursesFailure: false,
  uploadResultsSuccess: false,
  uploadResultsFailure: false,
  page: '',
  loading: false,
  courses: [],
  results: [],
  academics: [],
  loadingAcademics: false,
  deleteSuccess: false,
  isDeleting: false,
  publishing: false,
  publishingFailure: false,
  publishingStudent: false,
  publishingSuccess: false,
  loadingCourses: false,
  uploadStudentsFailure: false,
  uploadStudentsSuccess: false,
  sendNotificationFailure: false,
  sendNotificationSuccess: false,
  sendingNotification: false
}

const reducer: Reducer<AcademicsState> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPLOAD_COURSES_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        error: null
      }

    case ActionTypes.UPLOAD_COURSES_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        uploadCoursesSuccess: true,
        uploadCoursesFailure: false,
        page: constants.academics
      }

    case ActionTypes.UPLOAD_COURSES_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        uploadCoursesFailure: true,
        uploadCoursesSuccess: false,
        error: action.payload,
        page: constants.academics
      }

    case ActionTypes.UPLOAD_RESULTS_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        error: null
      }

    case ActionTypes.UPLOAD_RESULTS_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        uploadResultsSuccess: true,
        uploadResultsFailure: false,
        page: constants.academics
      }

    case ActionTypes.UPLOAD_RESULTS_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        uploadCoursesFailure: true,
        uploadResultsSuccess: false,
        error: action.payload,
        page: constants.academics
      }

    case ActionTypes.GET_COURSES_REQUEST:
      return {
        ...state,
        loadingCourses: true
      }

    case ActionTypes.GET_COURSES_SUCCESS:
      return {
        ...state,
        loadingCourses: false,
        courses: action.payload
      }

    case ActionTypes.GET_COURSES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case ActionTypes.GET_RESULTS_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ActionTypes.GET_RESULTS_SUCCESS:
      return {
        ...state,
        loading: false,
        results: action.payload
      }

    case ActionTypes.GET_RESULTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case ActionTypes.GET_STUDENTS_RESULTS_REQUEST:
      return {
        ...state,
        loadingAcademics: true
      }

    case ActionTypes.GET_STUDENTS_RESULTS_SUCCESS:
      return {
        ...state,
        loadingAcademics: false,
        academics: action.payload
      }

    case ActionTypes.GET_STUDENTS_RESULTS_FAILURE:
      return {
        ...state,
        loadingAcademics: false,
        error: action.payload
      }

    case ActionTypes.PUBLISH_RESULTS_REQUEST:
      return {
        ...state,
        publishing: true
      }

    case ActionTypes.PUBLISH_RESULTS_SUCCESS:
      return {
        ...state,
        publishing: false,
        publishingSuccess: true,
        publishingFailure: false,
        page: constants.academics
      }

    case ActionTypes.PUBLISH_RESULTS_FAILURE:
      return {
        ...state,
        publishing: false,
        publishingFailure: true,
        publishingSuccess: false,
        error: action.payload,
        page: constants.academics
      }

    case ActionTypes.PUBLISH_STUDENT_RESULTS_REQUEST:
      return {
        ...state,
        publishingStudent: true
      }

    case ActionTypes.PUBLISH_STUDENT_RESULTS_SUCCESS:
      return {
        ...state,
        publishingStudent: false,
        publishingSuccess: true,
        publishingFailure: false,
        page: constants.academics
      }

    case ActionTypes.PUBLISH_STUDENT_RESULTS_FAILURE:
      return {
        ...state,
        publishingStudent: false,
        publishingFailure: true,
        publishingSuccess: false,
        error: action.payload,
        page: constants.academics
      }

    case ActionTypes.CLEAR_BOOLEAN_STATES:
      return {
        ...state,
        error: null,
        uploadCourses: false,
        uploadCoursesSuccess: false,
        uploadCoursesFailure: false,
        uploadResults: false,
        uploadResultsSuccess: false,
        uploadResultsFailure: false,
        publishingSuccess: false,
        publishingFailure: false,
        deleteSuccess: false,
        isSubmitting: false,
        uploadStudentsSuccess: false,
        uploadStudentsFailure: false,
        sendNotificationSuccess: false,
        sendNotificationFailure: false
      }

    case ActionTypes.CLEAR_DATA:
      return {
        ...state,
        academics: []
      }

    case ActionTypes.DELETE_RESULTS_REQUEST:
      return {
        ...state,
        isDeleting: true,
        error: null,
        deleteSuccess: false
      }
    case ActionTypes.DELETE_RESULTS_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        deleteSuccess: true,
        page: constants.academics
      }
    case ActionTypes.DELETE_RESULTS_FAILURE:
      return {
        ...state,
        isDeleting: false,
        error: action.payload,
        deleteSuccess: false,
        page: constants.academics
      }

    case ActionTypes.UPLOAD_STUDENTS_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        error: null
      }

    case ActionTypes.UPLOAD_STUDENTS_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        uploadStudentsSuccess: true,
        uploadStudentsFailure: false,
        page: constants.academics
      }

    case ActionTypes.UPLOAD_STUDENTS_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        uploadStudentsSuccess: false,
        uploadStudentsFailure: true,
        error: action.payload,
        page: constants.academics
      }

    case ActionTypes.SEND_NOTIFICATION_REQUEST:
      return {
        ...state,
        sendingNotification: true
      }

    case ActionTypes.SEND_NOTIFICATION_SUCCESS:
      return {
        ...state,
        sendingNotification: false,
        sendNotificationSuccess: true,
        sendNotificationFailure: false,
        page: constants.academics
      }

    case ActionTypes.SEND_NOTIFICATION_FAILURE:
      return {
        ...state,
        sendingNotification: false,
        sendNotificationSuccess: true,
        sendNotificationFailure: false,
        error: action.payload,
        page: constants.academics
      }

    case AuthActionTypes.DESTROY_STATES:
      return initialState
    default:
      return state
  }
}

export { reducer as academicsReducer }
