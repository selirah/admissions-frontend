import { AdmissionLetter, Document } from '../../interfaces'

export enum LetterActionTypes {
  SUBMITTING = '@@letter/SUBMITTING',
  CREATE_REQUEST = '@@letter/CREATE_REQUEST',
  CREATE_SUCCESS = '@@letter/CREATE_SUCCESS',
  CREATE_FAILURE = '@@letter/CREATE_FAILURE',
  UPDATE_REQUEST = '@@letter/UPDATE_REQUEST',
  UPDATE_SUCCESS = '@@letter/UPDATE_SUCCESS',
  UPDATE_FAILURE = '@@letter/UPDATE_FAILURE',
  GET_LETTER_REQUEST = '@@letter/GET_LETTER_REQUEST',
  GET_LETTER_SUCCESS = '@@letter/GET_LETTER_SUCCESS',
  GET_LETTER_FAILURE = '@@letter/GET_LETTER_FAILURE',
  CLEAR_BOOLEAN_STATES = '@@letter/CLEAR_BOOLEAN_STATES',
  UPLOAD_LETTERHEAD_REQUEST = '@@letter/UPLOAD_LETTERHEAD_REQUEST',
  UPLOAD_LETTERHEAD_SUCCESS = '@@letter/UPLOAD_LETTERHEAD_SUCCESS',
  UPLOAD_LETTERHEAD_FAILURE = '@@letter/UPLOAD_LETTERHEAD_FAILURE',
  UPLOAD_LETTERFOOTER_REQUEST = '@@letter/UPLOAD_LETTERFOOTER_REQUEST',
  UPLOAD_LETTERFOOTER_SUCCESS = '@@letter/UPLOAD_LETTERFOOTER_SUCCESS',
  UPLOAD_LETTERFOOTER_FAILURE = '@@letter/UPLOAD_LETTERFOOTER_FAILURE',
  UPLOAD_DOCS_REQUEST = '@@letter/UPLOAD_DOCS_REQUEST',
  UPLOAD_DOCS_SUCCESS = '@@letter/UPLOAD_DOCS_SUCCESS',
  UPLOAD_DOCS_FAILURE = '@@letter/UPLOAD_DOCS_FAILURE',
  GET_DOCS_REQUEST = '@@letter/GET_DOCS_REQUEST',
  GET_DOCS_SUCCESS = '@@letter/GET_DOCS_SUCCESS',
  GET_DOCS_FAILURE = '@@letter/GET_DOCS_FAILURE',
  CREATE_NOTICE_REQUEST = '@@letter/CREATE_NOTICE_REQUEST',
  CREATE_NOTICE_SUCCESS = '@@letter/CREATE_NOTICE_SUCCESS',
  CREATE_NOTICE_FAILURE = '@@letter/CREATE_NOTICE_FAILURE',
  CLEAR_DATA = '@@letter/CLEAR_DATA',
  REMOVE_LETTERFOOTER_REQUEST = '@@letter/REMOVE_LETTERFOOTER_REQUEST',
  REMOVE_LETTERFOOTER_SUCCESS = '@@letter/REMOVE_LETTERFOOTER_SUCCESS',
  REMOVE_LETTERFOOTER_FAILURE = '@@letter/REMOVE_LETTERFOOTER_FAILURE'
}

export type LetterState = {
  readonly isSubmitting: boolean
  readonly letter: AdmissionLetter | null
  readonly error: any
  readonly success: boolean
  readonly failure: boolean
  readonly page: string
  readonly loading: boolean
  readonly docs: Document | null
  readonly isUploadingLetterHead: boolean
  readonly isUploadingLetterFooter: boolean
  readonly isUploadingDocs: boolean
  readonly letterHeadSuccess: boolean
  readonly letterHeadFailure: boolean
  readonly letterFooterSuccess: boolean
  readonly letterFooterFailure: boolean
  readonly docSuccess: boolean
  readonly docFailure: boolean
  readonly submitNotice: boolean
  readonly noticeSuccess: boolean
  readonly noticeError: any
  readonly noticeFailure: boolean
  readonly isRemovingFooter: boolean
  readonly removeFooterSuccess: boolean
  readonly removeFooterFailure: boolean
}
