import { Student, Duplicate } from '../../interfaces'

export enum StudentsActionTypes {
  SUBMITTING = '@@students/SUBMITTING',
  CREATE_REQUEST = '@@students/CREATE_REQUEST',
  CREATE_SUCCESS = '@@students/CREATE_SUCCESS',
  CREATE_FAILURE = '@@students/CREATE_FAILURE',
  UPDATE_REQUEST = '@@students/UPDATE_REQUEST',
  UPDATE_SUCCESS = '@@students/UPDATE_SUCCESS',
  UPDATE_FAILURE = '@@students/UPDATE_FAILURE',
  DELETE_REQUEST = '@@students/DELETE_REQUEST',
  DELETE_SUCCESS = '@@students/DELETE_SUCCESS',
  DELETE_FAILURE = '@@students/DELETE_FAILURE',
  GET_STUDENTS_REQUEST = '@@students/GET_STUDENTS_REQUEST',
  GET_STUDENTS_SUCCESS = '@@students/GET_STUDENTS_SUCCESS',
  GET_STUDENTS_FAILURE = '@@students/GET_STUDENTS_FAILURE',
  CLEAR_BOOLEAN_STATES = '@@students/CLEAR_BOOLEAN_STATES',
  STUDENTS_ACTION_REQUEST = '@@students/STUDENTS_ACTION_REQUEST',
  STUDENTS_ACTION_SUCCESS = '@@students/STUDENTS_ACTION_SUCCESS',
  STUDENTS_ACTION_FAILURE = '@@students/STUDENTS_ACTION_FAILURE',
  ACTION_REQUEST = '@@students/ACTION_REQUEST',
  ACTION_SUCCESS = '@@students/ACTION_SUCCESS',
  ACTION_FAILURE = '@@students/ACTION_FAILURE',
  UPLOAD_STUDENTS_REQUEST = '@@students/UPLOAD_STUDENTS_REQUEST',
  UPLOAD_STUDENTS_SUCCESS = '@@students/UPLOAD_STUDENTS_SUCCESS',
  UPLOAD_STUDENTS_FAILURE = '@@students/UPLOAD_STUDENTS_FAILURE',
  EXPORT_REQUEST = '@@students/EXPORT_REQUEST',
  EXPORT_SUCCESS = '@@students/EXPORT_SUCCESS',
  EXPORT_FAILURE = '@@students/EXPORT_FAILURE',
  CLEAR_DATA = '@@students/CLEAR_DATA',
  CLEAR_DUPLICATES = '@@students/CLEAR_DUPLICATES',
  GET_RECEIPT_STUDENTS_REQUEST = '@@students/GET_RECEIPT_STUDENTS_REQUEST',
  GET_RECEIPT_STUDENTS_SUCCESS = '@@students/GET_RECEIPT_STUDENTS_SUCCESS',
  GET_RECEIPT_STUDENTS_FAILURE = '@@students/GET_RECEIPT_STUDENTS_FAILURE',
  GET_FEE_STUDENTS_REQUEST = '@@students/GET_FEE_STUDENTS_REQUEST',
  GET_FEE_STUDENTS_SUCCESS = '@@students/GET_FEE_STUDENTS_SUCCESS',
  GET_FEE_STUDENTS_FAILURE = '@@students/GET_FEE_STUDENTS_FAILURE'
}

export type StudentsState = {
  readonly isSubmitting: boolean
  readonly students: Student[]
  readonly error: any
  readonly success: boolean
  readonly failure: boolean
  readonly page: string
  readonly loading: boolean
  readonly isDeleting: boolean
  readonly deleteSuccess: boolean
  readonly performAction: boolean
  readonly actionSuccess: boolean
  readonly actionFailure: boolean
  readonly studentAction: boolean
  readonly studentActionSuccess: boolean
  readonly studentActionFailure: boolean
  readonly upload: boolean
  readonly uploadSuccess: boolean
  readonly uploadFailure: boolean
  readonly uploadMessage: any
  readonly exporting: boolean
  readonly exportSuccess: boolean
  readonly exportFailure: boolean
  readonly duplicates: Duplicate[]
  readonly receiptsStudents: Student[]
}
