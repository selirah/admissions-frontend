import { Academics, Course, Results } from '../../interfaces'

export enum ActionTypes {
  SUBMITTING = '@@academics/SUBMITTING',
  UPLOAD_COURSES_REQUEST = '@@academics/UPLOAD_COURSES_REQUEST',
  UPLOAD_COURSES_SUCCESS = '@@academics/UPLOAD_COURSES_SUCCESS',
  UPLOAD_COURSES_FAILURE = '@@academics/UPLOAD_COURSES_FAILURE',
  UPLOAD_RESULTS_REQUEST = '@@academics/UPLOAD_RESULTS_REQUEST',
  UPLOAD_RESULTS_SUCCESS = '@@academics/UPLOAD_RESULTS_SUCCESS',
  UPLOAD_RESULTS_FAILURE = '@@academics/UPLOAD_RESULTS_FAILURE',
  CLEAR_BOOLEAN_STATES = '@@academics/CLEAR_BOOLEAN_STATES',
  GET_COURSES_REQUEST = '@@academics/GET_COURSES_REQUEST',
  GET_COURSES_SUCCESS = '@@academics/GET_COURSES_SUCCESS',
  GET_COURSES_FAILURE = '@@academics/GET_COURSES_FAILURE',
  GET_RESULTS_REQUEST = '@@academics/GET_RESULTS_REQUEST',
  GET_RESULTS_SUCCESS = '@@academics/GET_RESULTS_SUCCESS',
  GET_RESULTS_FAILURE = '@@academics/GET_RESULTS_FAILURE',
  GET_STUDENTS_RESULTS_REQUEST = '@@academics/GET_STUDENTS_RESULTS_REQUEST',
  GET_STUDENTS_RESULTS_SUCCESS = '@@academics/GET_STUDENTS_RESULTS_SUCCESS',
  GET_STUDENTS_RESULTS_FAILURE = '@@academics/GET_STUDENTS_RESULTS_FAILURE',
  CLEAR_DATA = '@@academics/CLEAR_DATA',
  DELETE_RESULTS_REQUEST = '@@academics/DELETE_RESULTS_REQUEST',
  DELETE_RESULTS_SUCCESS = '@@academics/DELETE_RESULTS_SUCCESS',
  DELETE_RESULTS_FAILURE = '@@academics/DELETE_RESULTS_FAILURE',
  PUBLISH_RESULTS_REQUEST = '@@academics/PUBLISH_RESULTS_REQUEST',
  PUBLISH_RESULTS_SUCCESS = '@@academics/PUBLISH_RESULTS_SUCCESS',
  PUBLISH_RESULTS_FAILURE = '@@academics/PUBLISH_RESULTS_FAILURE',
  PUBLISH_STUDENT_RESULTS_REQUEST = '@@academics/PUBLISH_STUDENT_RESULTS_REQUEST',
  PUBLISH_STUDENT_RESULTS_SUCCESS = '@@academics/PUBLISH_STUDENT_RESULTS_SUCCESS',
  PUBLISH_STUDENT_RESULTS_FAILURE = '@@academics/PUBLISH_STUDENT_RESULTS_FAILURE',
  UPLOAD_STUDENTS_REQUEST = '@@academics/UPLOAD_STUDENTS_REQUEST',
  UPLOAD_STUDENTS_SUCCESS = '@@academics/UPLOAD_STUDENTS_SUCCESS',
  UPLOAD_STUDENTS_FAILURE = '@@academics/UPLOAD_STUDENTS_FAILURE',
  SEND_NOTIFICATION_REQUEST = '@@academics/SEND_NOTIFICATION_REQUEST',
  SEND_NOTIFICATION_SUCCESS = '@@academics/SEND_NOTIFICATION_SUCCESS',
  SEND_NOTIFICATION_FAILURE = '@@academics/SEND_NOTIFICATION_FAILURE'
}

export type AcademicsState = {
  readonly isSubmitting: boolean
  readonly error: any
  readonly uploadCoursesSuccess: boolean
  readonly uploadCoursesFailure: boolean
  readonly uploadResultsSuccess: boolean
  readonly uploadResultsFailure: boolean
  readonly uploadStudentsSuccess: boolean
  readonly uploadStudentsFailure: boolean
  readonly page: string
  readonly loading: boolean
  readonly loadingAcademics: boolean
  readonly courses: Course[]
  readonly results: Results[]
  readonly academics: Academics[]
  readonly isDeleting: boolean
  readonly deleteSuccess: boolean
  readonly publishing: boolean
  readonly publishingStudent: boolean
  readonly publishingSuccess: boolean
  readonly publishingFailure: boolean
  readonly loadingCourses: boolean
  readonly sendingNotification: boolean
  readonly sendNotificationSuccess: boolean
  readonly sendNotificationFailure: boolean
}
