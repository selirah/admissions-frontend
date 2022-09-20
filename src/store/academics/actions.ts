import { action } from 'typesafe-actions'
import {
  Course,
  AcademicsPayload,
  CoursePayload,
  Results,
  Academics,
  StudentsPayload
} from '../../interfaces'
import { ActionTypes } from './types'

const academicActions = {
  uploadCoursesRequest: (payload: CoursePayload) =>
    action(ActionTypes.UPLOAD_COURSES_REQUEST, payload),
  uploadCoursesSuccess: () => action(ActionTypes.UPLOAD_COURSES_SUCCESS),
  uploadCoursesFailure: (error: any) =>
    action(ActionTypes.UPLOAD_COURSES_FAILURE, error),
  uploadResultsRequest: (payload: AcademicsPayload) =>
    action(ActionTypes.UPLOAD_RESULTS_REQUEST, payload),
  uploadResultsSuccess: () => action(ActionTypes.UPLOAD_RESULTS_SUCCESS),
  uploadResultsFailure: (error: any) =>
    action(ActionTypes.UPLOAD_RESULTS_FAILURE, error),
  getCoursesRequest: (schoolId: string | number) =>
    action(ActionTypes.GET_COURSES_REQUEST, schoolId),
  getCoursesSuccess: (data: Course[]) =>
    action(ActionTypes.GET_COURSES_SUCCESS, data),
  getCoursesFailure: (error: any) =>
    action(ActionTypes.GET_COURSES_FAILURE, error),
  getResultsRequest: (payload: any) =>
    action(ActionTypes.GET_RESULTS_REQUEST, payload),
  getResultsSuccess: (data: Results[]) =>
    action(ActionTypes.GET_RESULTS_SUCCESS, data),
  getResultsFailure: (error: any) =>
    action(ActionTypes.GET_RESULTS_FAILURE, error),
  getAcademicsRequest: (resultId: number | string) =>
    action(ActionTypes.GET_STUDENTS_RESULTS_REQUEST, resultId),
  getAcademicsSuccess: (data: Academics[]) =>
    action(ActionTypes.GET_STUDENTS_RESULTS_SUCCESS, data),
  getAcademicsFailure: (error: any) =>
    action(ActionTypes.GET_STUDENTS_RESULTS_FAILURE, error),
  deleteResultRequest: (id: number) =>
    action(ActionTypes.DELETE_RESULTS_REQUEST, id),
  deleteResultSuccess: () => action(ActionTypes.DELETE_RESULTS_SUCCESS),
  deleteResultFailure: (error: any) =>
    action(ActionTypes.DELETE_RESULTS_FAILURE, error),
  clearBooleanStates: () => action(ActionTypes.CLEAR_BOOLEAN_STATES),
  clearData: () => action(ActionTypes.CLEAR_DATA),
  publishResultRequest: (payload: any) =>
    action(ActionTypes.PUBLISH_RESULTS_REQUEST, payload),
  publishResultSuccess: () => action(ActionTypes.PUBLISH_RESULTS_SUCCESS),
  publishResultFailure: (error: any) =>
    action(ActionTypes.PUBLISH_RESULTS_FAILURE, error),
  publishStudentResultRequest: (payload: any) =>
    action(ActionTypes.PUBLISH_STUDENT_RESULTS_REQUEST, payload),
  publishStudentResultSuccess: () =>
    action(ActionTypes.PUBLISH_STUDENT_RESULTS_SUCCESS),
  publishStudentResultFailure: (error: any) =>
    action(ActionTypes.PUBLISH_STUDENT_RESULTS_FAILURE, error),
  uploadStudentsRequest: (payload: StudentsPayload) =>
    action(ActionTypes.UPLOAD_STUDENTS_REQUEST, payload),
  uploadStudentsSuccess: () => action(ActionTypes.UPLOAD_STUDENTS_SUCCESS),
  uploadStudentsFailure: (error: any) =>
    action(ActionTypes.UPLOAD_STUDENTS_FAILURE, error),
  sendNotificationRequest: (payload: any) =>
    action(ActionTypes.SEND_NOTIFICATION_REQUEST, payload),
  sendNotificationSuccess: () => action(ActionTypes.SEND_NOTIFICATION_SUCCESS),
  sendNotificationFailure: (error: any) =>
    action(ActionTypes.SEND_NOTIFICATION_FAILURE, error)
}

export default academicActions
