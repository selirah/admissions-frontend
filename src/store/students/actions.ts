import { action } from 'typesafe-actions'
import { Student, StudentAction, Duplicate } from '../../interfaces'
import { StudentsActionTypes } from './types'

export const createRequest = (payload: Student) =>
  action(StudentsActionTypes.CREATE_REQUEST, payload)

export const createSuccess = (student: Student) =>
  action(StudentsActionTypes.CREATE_SUCCESS, student)

export const createFailure = (error: any) =>
  action(StudentsActionTypes.CREATE_FAILURE, error)

export const updateRequest = (payload: Student) =>
  action(StudentsActionTypes.UPDATE_REQUEST, payload)

export const updateSuccess = (data: Student) =>
  action(StudentsActionTypes.UPDATE_SUCCESS, data)

export const updateFailure = (error: any) =>
  action(StudentsActionTypes.UPDATE_FAILURE, error)

export const deleteRequest = (payload: number) =>
  action(StudentsActionTypes.DELETE_REQUEST, payload)

export const deleteSuccess = (data: number) =>
  action(StudentsActionTypes.DELETE_SUCCESS, data)

export const deleteFailure = (error: any) =>
  action(StudentsActionTypes.DELETE_FAILURE, error)

export const getStudentsRequest = (payload: any) =>
  action(StudentsActionTypes.GET_STUDENTS_REQUEST, payload)

export const getStudentsSuccess = (data: Student[]) =>
  action(StudentsActionTypes.GET_STUDENTS_SUCCESS, data)

export const getStudentsFailure = (error: any) =>
  action(StudentsActionTypes.GET_STUDENTS_FAILURE, error)

export const performStudentsActionsRequest = (payload: StudentAction) =>
  action(StudentsActionTypes.STUDENTS_ACTION_REQUEST, payload)

export const performStudentsActionsSuccess = () =>
  action(StudentsActionTypes.STUDENTS_ACTION_SUCCESS)

export const performStudentsActionsFailure = (error: any) =>
  action(StudentsActionTypes.STUDENTS_ACTION_FAILURE, error)

export const studentActionRequest = (payload: StudentAction) =>
  action(StudentsActionTypes.ACTION_REQUEST, payload)

export const studentActionSuccess = () =>
  action(StudentsActionTypes.ACTION_SUCCESS)

export const studentActionFailure = (error: any) =>
  action(StudentsActionTypes.ACTION_FAILURE, error)

export const uploadStudentsRequest = (payload: any) =>
  action(StudentsActionTypes.UPLOAD_STUDENTS_REQUEST, payload)

export const uploadStudentsSuccess = (data: Duplicate[]) =>
  action(StudentsActionTypes.UPLOAD_STUDENTS_SUCCESS, data)

export const uploadStudentsFailure = (error: any) =>
  action(StudentsActionTypes.UPLOAD_STUDENTS_FAILURE, error)

export const exportStudentsRequest = (payload: any) =>
  action(StudentsActionTypes.EXPORT_REQUEST, payload)

export const exportStudentsSuccess = () =>
  action(StudentsActionTypes.EXPORT_SUCCESS)

export const exportStudentsFailure = (error: any) =>
  action(StudentsActionTypes.EXPORT_FAILURE, error)

export const clearBooleanStates = () =>
  action(StudentsActionTypes.CLEAR_BOOLEAN_STATES)

export const clearStudents = () => action(StudentsActionTypes.CLEAR_DATA)

export const clearDuplicates = () =>
  action(StudentsActionTypes.CLEAR_DUPLICATES)

export const getReceiptStudentsRequest = (payload: any) =>
  action(StudentsActionTypes.GET_RECEIPT_STUDENTS_REQUEST, payload)

export const getReceiptStudentsSuccess = (data: Student[]) =>
  action(StudentsActionTypes.GET_RECEIPT_STUDENTS_SUCCESS, data)

export const getReceiptStudentsFailure = (error: any) =>
  action(StudentsActionTypes.GET_RECEIPT_STUDENTS_FAILURE, error)

export const getFeeStudentsRequest = (payload: any) =>
  action(StudentsActionTypes.GET_FEE_STUDENTS_REQUEST, payload)

export const getFeeStudentsSuccess = (data: Student[]) =>
  action(StudentsActionTypes.GET_FEE_STUDENTS_SUCCESS, data)

export const getFeeStudentsFailure = (error: any) =>
  action(StudentsActionTypes.GET_FEE_STUDENTS_FAILURE, error)
