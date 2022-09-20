import { action } from 'typesafe-actions'
import { AdmissionLetter, Document } from '../../interfaces'
import { LetterActionTypes } from './types'

export const createRequest = (payload: AdmissionLetter) =>
  action(LetterActionTypes.CREATE_REQUEST, payload)

export const createSuccess = (letter: AdmissionLetter) =>
  action(LetterActionTypes.CREATE_SUCCESS, letter)

export const createFailure = (error: any) =>
  action(LetterActionTypes.CREATE_FAILURE, error)

export const updateRequest = (payload: AdmissionLetter) =>
  action(LetterActionTypes.UPDATE_REQUEST, payload)

export const updateSuccess = (letter: AdmissionLetter) =>
  action(LetterActionTypes.UPDATE_SUCCESS, letter)

export const updateFailure = (error: any) =>
  action(LetterActionTypes.UPDATE_FAILURE, error)

export const getLetterRequest = (payload: number) =>
  action(LetterActionTypes.GET_LETTER_REQUEST, payload)

export const getLetterSuccess = (data: AdmissionLetter | null) =>
  action(LetterActionTypes.GET_LETTER_SUCCESS, data)

export const getLetterFailure = (error: any) =>
  action(LetterActionTypes.GET_LETTER_FAILURE, error)

export const clearBooleanStates = () =>
  action(LetterActionTypes.CLEAR_BOOLEAN_STATES)

export const uploadLetterHeadRequest = (payload: any) =>
  action(LetterActionTypes.UPLOAD_LETTERHEAD_REQUEST, payload)

export const uploadLetterHeadSuccess = (document: Document) =>
  action(LetterActionTypes.UPLOAD_LETTERHEAD_SUCCESS, document)

export const uploadLetterHeadFailure = (error: any) =>
  action(LetterActionTypes.UPLOAD_LETTERHEAD_FAILURE, error)

export const uploadLetterFooterRequest = (payload: any) =>
  action(LetterActionTypes.UPLOAD_LETTERFOOTER_REQUEST, payload)

export const uploadLetterFooterSuccess = (document: Document) =>
  action(LetterActionTypes.UPLOAD_LETTERFOOTER_SUCCESS, document)

export const uploadLetterFooterFailure = (error: any) =>
  action(LetterActionTypes.UPLOAD_LETTERFOOTER_FAILURE, error)

export const uploadDocsRequest = (payload: any) =>
  action(LetterActionTypes.UPLOAD_DOCS_REQUEST, payload)

export const uploadDocsSuccess = (document: Document) =>
  action(LetterActionTypes.UPLOAD_DOCS_SUCCESS, document)

export const uploadDocsFailure = (error: any) =>
  action(LetterActionTypes.UPLOAD_DOCS_FAILURE, error)

export const getDocsRequest = (payload: number) =>
  action(LetterActionTypes.GET_DOCS_REQUEST, payload)

export const getDocsSuccess = (data: Document | null) =>
  action(LetterActionTypes.GET_DOCS_SUCCESS, data)

export const getDocsFailure = (error: any) =>
  action(LetterActionTypes.GET_DOCS_FAILURE, error)

export const clearLetter = () => action(LetterActionTypes.CLEAR_DATA)

export const createNoticeRequest = (payload: AdmissionLetter) =>
  action(LetterActionTypes.CREATE_NOTICE_REQUEST, payload)

export const createNoticeSuccess = () =>
  action(LetterActionTypes.CREATE_NOTICE_SUCCESS)

export const createNoticeFailure = (error: any) =>
  action(LetterActionTypes.CREATE_NOTICE_FAILURE, error)

export const removeLetterFooterRequest = () =>
  action(LetterActionTypes.REMOVE_LETTERFOOTER_REQUEST)

export const removeLetterFooterSuccess = (document: Document) =>
  action(LetterActionTypes.REMOVE_LETTERFOOTER_SUCCESS, document)

export const removeLetterFooterFailure = (error: any) =>
  action(LetterActionTypes.REMOVE_LETTERFOOTER_FAILURE, error)
