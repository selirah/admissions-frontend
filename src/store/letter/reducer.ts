import { Reducer } from 'redux'
import { LetterState, LetterActionTypes } from './types'
import { AuthActionTypes } from '../auth'
import { constants } from '../../helpers/constants'

export const initialState: LetterState = {
  isSubmitting: false,
  error: undefined,
  success: false,
  failure: false,
  letter: null,
  page: '',
  loading: false,
  docFailure: false,
  docSuccess: false,
  docs: null,
  isUploadingDocs: false,
  isUploadingLetterHead: false,
  letterHeadFailure: false,
  letterHeadSuccess: false,
  noticeError: undefined,
  noticeFailure: false,
  noticeSuccess: false,
  submitNotice: false,
  isUploadingLetterFooter: false,
  letterFooterFailure: false,
  letterFooterSuccess: false,
  isRemovingFooter: false,
  removeFooterFailure: false,
  removeFooterSuccess: false
}

const reducer: Reducer<LetterState> = (state = initialState, action) => {
  switch (action.type) {
    case LetterActionTypes.CREATE_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        error: undefined,
        success: false,
        failure: false
      }
    case LetterActionTypes.CREATE_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        success: true,
        failure: false,
        page: constants.letter,
        letter: action.payload
      }
    case LetterActionTypes.CREATE_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        success: false,
        failure: true,
        error: action.payload,
        page: constants.letter
      }
    case LetterActionTypes.UPDATE_REQUEST:
      return {
        ...state,
        isSubmitting: true
      }
    case LetterActionTypes.UPDATE_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        letter: action.payload,
        success: true,
        page: constants.letter,
        failure: false
      }
    case LetterActionTypes.UPDATE_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        error: action.payload,
        success: false,
        failure: true,
        page: constants.letter
      }

    case LetterActionTypes.GET_LETTER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case LetterActionTypes.GET_LETTER_SUCCESS:
      return {
        ...state,
        loading: false,
        letter: action.payload
      }

    case LetterActionTypes.GET_LETTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case LetterActionTypes.UPLOAD_LETTERHEAD_REQUEST:
      return {
        ...state,
        isUploadingLetterHead: true,
        error: undefined,
        letterHeadSuccess: false,
        letterHeadFailure: false
      }
    case LetterActionTypes.UPLOAD_LETTERHEAD_SUCCESS:
      return {
        ...state,
        isUploadingLetterHead: false,
        letterHeadSuccess: true,
        letterHeadFailure: false,
        page: constants.letter,
        docs: action.payload
      }
    case LetterActionTypes.UPLOAD_LETTERHEAD_FAILURE:
      return {
        ...state,
        isUploadingLetterHead: false,
        letterHeadSuccess: false,
        letterHeadFailure: true,
        error: action.payload,
        page: constants.letter
      }

    case LetterActionTypes.UPLOAD_LETTERFOOTER_REQUEST:
      return {
        ...state,
        isUploadingLetterFooter: true,
        error: undefined,
        letterFooterSuccess: false,
        letterFooterFailure: false
      }
    case LetterActionTypes.UPLOAD_LETTERFOOTER_SUCCESS:
      return {
        ...state,
        isUploadingLetterFooter: false,
        letterFooterSuccess: true,
        letterFooterFailure: false,
        page: constants.letter,
        docs: action.payload
      }
    case LetterActionTypes.UPLOAD_LETTERFOOTER_FAILURE:
      return {
        ...state,
        isUploadingLetterFooter: false,
        letterFooterSuccess: false,
        letterFooterFailure: true,
        error: action.payload,
        page: constants.letter
      }

    case LetterActionTypes.UPLOAD_DOCS_REQUEST:
      return {
        ...state,
        isUploadingDocs: true,
        error: undefined,
        docSuccess: false,
        docFailure: false
      }
    case LetterActionTypes.UPLOAD_DOCS_SUCCESS:
      return {
        ...state,
        isUploadingDocs: false,
        docSuccess: true,
        docFailure: false,
        page: constants.letter,
        docs: action.payload
      }
    case LetterActionTypes.UPLOAD_DOCS_FAILURE:
      return {
        ...state,
        isUploadingDocs: false,
        docSuccess: false,
        docFailure: true,
        error: action.payload,
        page: constants.letter
      }
    case LetterActionTypes.GET_DOCS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case LetterActionTypes.GET_DOCS_SUCCESS:
      return {
        ...state,
        loading: false,
        docs: action.payload
      }

    case LetterActionTypes.GET_DOCS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case LetterActionTypes.CLEAR_BOOLEAN_STATES:
      return {
        ...state,
        success: false,
        failure: false,
        letterHeadSuccess: false,
        letterHeadFailure: false,
        docSuccess: false,
        docFailure: false,
        noticeFailure: false,
        noticeSuccess: false,
        isSubmitting: false,
        submitNotice: false,
        isUploadingDocs: false,
        isUploadingLetterHead: false,
        isUploadingLetterFooter: false,
        letterFooterSuccess: false,
        letterFooterFailure: false,
        error: undefined,
        isRemovingFooter: false,
        removeFooterFailure: false,
        removeFooterSuccess: false
      }
    case LetterActionTypes.CREATE_NOTICE_REQUEST:
      return {
        ...state,
        submitNotice: true,
        noticeError: undefined,
        noticeSuccess: false,
        noticeFailure: false
      }
    case LetterActionTypes.CREATE_NOTICE_SUCCESS:
      return {
        ...state,
        submitNotice: false,
        noticeSuccess: true,
        noticeFailure: false,
        page: constants.letter
      }
    case LetterActionTypes.CREATE_NOTICE_FAILURE:
      return {
        ...state,
        submitNotice: false,
        noticeSuccess: false,
        noticeFailure: true,
        noticeError: action.payload,
        page: constants.letter
      }
    case LetterActionTypes.CLEAR_DATA:
      return {
        ...state,
        letter: null,
        docs: null
      }

    case LetterActionTypes.REMOVE_LETTERFOOTER_REQUEST:
      return {
        ...state,
        isRemovingFooter: true,
        error: undefined,
        removeFooterSuccess: false,
        removeFooterFailure: false
      }
    case LetterActionTypes.REMOVE_LETTERFOOTER_SUCCESS:
      return {
        ...state,
        isRemovingFooter: false,
        removeFooterSuccess: true,
        removeFooterFailure: false,
        page: constants.letter,
        docs: action.payload
      }
    case LetterActionTypes.REMOVE_LETTERFOOTER_FAILURE:
      return {
        ...state,
        isRemovingFooter: false,
        removeFooterSuccess: false,
        removeFooterFailure: true,
        error: action.payload,
        page: constants.letter
      }
    case AuthActionTypes.DESTROY_STATES:
      return initialState
    default:
      return state
  }
}

export { reducer as letterReducer }
