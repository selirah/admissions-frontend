import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { LetterActionTypes } from './types'
import {
  createSuccess,
  createFailure,
  updateSuccess,
  updateFailure,
  getLetterSuccess,
  getLetterFailure,
  uploadLetterHeadSuccess,
  uploadLetterHeadFailure,
  uploadDocsSuccess,
  uploadDocsFailure,
  getDocsSuccess,
  getDocsFailure,
  createNoticeFailure,
  createNoticeSuccess,
  uploadLetterFooterSuccess,
  uploadLetterFooterFailure,
  removeLetterFooterFailure,
  removeLetterFooterSuccess
} from './actions'
import { callApiPost, callApiGet, callApiPut } from '../../utils/api'
import { AdmissionLetter } from '../../interfaces'
import { isEmpty } from '../../helpers/isEmpty'

function* createLetter({
  payload
}: {
  type: string
  payload: AdmissionLetter
}) {
  try {
    const res = yield call(callApiPost, 'letter', payload)
    yield put(createSuccess(res.data))
  } catch (err: any) {
    yield put(createFailure(err.response.data))
  }
}

function* updateLetter({
  payload
}: {
  type: string
  payload: AdmissionLetter
}) {
  try {
    yield call(callApiPut, 'letter', payload, payload.id)
    yield put(updateSuccess(payload))
  } catch (err: any) {
    yield put(updateFailure(err.response.data))
  }
}

function* getLetter({ payload }: { type: string; payload: number }) {
  try {
    const res = yield call(callApiGet, `letter?school_id=${payload}`)
    if (isEmpty(res.data)) {
      yield put(getLetterSuccess(null))
    } else {
      yield put(getLetterSuccess(res.data))
    }
  } catch (err: any) {
    yield put(getLetterFailure(err.response.data))
  }
}

function* uploadLetterHead({ payload }: { type: string; payload: any }) {
  try {
    const res = yield call(callApiPost, 'document/letter-head', payload)
    yield put(uploadLetterHeadSuccess(res.data))
  } catch (err: any) {
    yield put(uploadLetterHeadFailure(err.response.data))
  }
}

function* uploadLetterFooter({ payload }: { type: string; payload: any }) {
  try {
    const res = yield call(callApiPost, 'document/letter-footer', payload)
    yield put(uploadLetterFooterSuccess(res.data))
  } catch (err: any) {
    yield put(uploadLetterFooterFailure(err.response.data))
  }
}

function* removeLetterFooter() {
  try {
    const res = yield call(callApiGet, 'document/remove-letter-footer')
    yield put(removeLetterFooterSuccess(res.data))
  } catch (err: any) {
    yield put(removeLetterFooterFailure(err.response.data))
  }
}

function* uploadDocuments({ payload }: { type: string; payload: any }) {
  try {
    const res = yield call(callApiPost, 'document', payload)
    yield put(uploadDocsSuccess(res.data))
  } catch (err: any) {
    yield put(uploadDocsFailure(err.response.data))
  }
}

function* getDocs({ payload }: { type: string; payload: number }) {
  try {
    const res = yield call(callApiGet, `document?school_id=${payload}`)
    if (isEmpty(res.data)) {
      yield put(getDocsSuccess(null))
    } else {
      yield put(getDocsSuccess(res.data))
    }
  } catch (err: any) {
    yield put(getDocsFailure(err.response.data))
  }
}

function* createNotice({
  payload
}: {
  type: string
  payload: AdmissionLetter
}) {
  try {
    yield call(callApiPost, 'letter/notice', payload)
    yield put(createNoticeSuccess())
  } catch (err: any) {
    yield put(createNoticeFailure(err.response.data))
  }
}

function* watchCreateLetter() {
  yield takeEvery(LetterActionTypes.CREATE_REQUEST, createLetter)
}

function* watchUpdateLetter() {
  yield takeEvery(LetterActionTypes.UPDATE_REQUEST, updateLetter)
}

function* watchGetLetter() {
  yield takeEvery(LetterActionTypes.GET_LETTER_REQUEST, getLetter)
}

function* watchUploadLetterHead() {
  yield takeEvery(LetterActionTypes.UPLOAD_LETTERHEAD_REQUEST, uploadLetterHead)
}

function* watchUploadLetterFooter() {
  yield takeEvery(
    LetterActionTypes.UPLOAD_LETTERFOOTER_REQUEST,
    uploadLetterFooter
  )
}

function* watchRemoveLetterFooter() {
  yield takeEvery(
    LetterActionTypes.REMOVE_LETTERFOOTER_REQUEST,
    removeLetterFooter
  )
}

function* watchUploadDocs() {
  yield takeEvery(LetterActionTypes.UPLOAD_DOCS_REQUEST, uploadDocuments)
}

function* watchGetDocs() {
  yield takeEvery(LetterActionTypes.GET_DOCS_REQUEST, getDocs)
}

function* watchCreateNotice() {
  yield takeEvery(LetterActionTypes.CREATE_NOTICE_REQUEST, createNotice)
}

function* letterSaga() {
  yield all([
    fork(watchCreateLetter),
    fork(watchUpdateLetter),
    fork(watchGetLetter),
    fork(watchUploadLetterHead),
    fork(watchUploadLetterFooter),
    fork(watchUploadDocs),
    fork(watchGetDocs),
    fork(watchCreateNotice),
    fork(watchRemoveLetterFooter)
  ])
}

export { letterSaga }
