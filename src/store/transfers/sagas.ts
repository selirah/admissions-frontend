import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { TransfersActionTypes } from './types'
import {
  createSuccess,
  createFailure,
  deleteSuccess,
  deleteFailure,
  getTransfersFailure,
  getTransfersSuccess,
  transferActionFailure,
  transferActionSuccess,
  createTransferDuplicateFailure,
  createTransferDuplicateSuccess,
  exportTransfersFailure,
  exportTransfersSuccess,
  getTransferCountFailure,
  getTransferCountSuccess
} from './actions'
import { callApiPost, callApiGet, callApiDelete } from '../../utils/api'

function* createTransfer({ payload }: { type: string; payload: any }) {
  try {
    const res = yield call(callApiPost, 'transfers', payload)
    yield put(createSuccess(res.data))
  } catch (err: any) {
    yield put(createFailure(err.response.data))
  }
}

function* deleteTransfer({ payload }: { type: string; payload: number }) {
  try {
    yield call(callApiDelete, 'transfers', payload)
    yield put(deleteSuccess(payload))
  } catch (err: any) {
    yield put(deleteFailure(err.response.data))
  }
}

function* getTransfers({ payload }: { type: string; payload: any }) {
  try {
    const res = yield call(
      callApiGet,
      `transfers?school_id=${payload.school_id}&academic_year=${payload.academic_year}`
    )
    yield put(getTransfersSuccess(res.data))
  } catch (err: any) {
    yield put(getTransfersFailure(err.response.data))
  }
}

function* performAction({ payload }: { type: string; payload: any }) {
  try {
    yield call(callApiGet, `transfers/${payload.id}?action=${payload.action}`)
    yield put(transferActionSuccess())
  } catch (err: any) {
    yield put(transferActionFailure(err.response.data))
  }
}

function* createTransferDuplicates({
  payload
}: {
  type: string
  payload: any
}) {
  try {
    yield call(callApiPost, 'transfers/duplicates', payload)
    yield put(createTransferDuplicateSuccess())
  } catch (err: any) {
    yield put(createTransferDuplicateFailure(err.response.data))
  }
}

function* exportTransfers({ payload }: { type: string; payload: any }) {
  try {
    const res = yield call(callApiPost, `transfers/export-transfers`, payload)
    yield put(exportTransfersSuccess())
    let file = res.data.content
    let fileName = res.data.fileName
    let link = document.createElement('a')
    link.href = `data:application/pdf;base64,${file}`
    link.download = fileName
    link.click()
  } catch (err: any) {
    yield put(exportTransfersFailure(err.response.data))
  }
}

function* getTransferCount({ payload }: { type: string; payload: any }) {
  try {
    const res = yield call(
      callApiGet,
      `transfers/get-count?school_id=${payload.school_id}&academic_year=${payload.academic_year}`
    )
    yield put(getTransferCountSuccess(res.data))
  } catch (err: any) {
    yield put(getTransferCountFailure(err.response.data))
  }
}

function* watchCreateTransfer() {
  yield takeEvery(TransfersActionTypes.CREATE_REQUEST, createTransfer)
}

function* watchDeleteTransfer() {
  yield takeEvery(TransfersActionTypes.DELETE_REQUEST, deleteTransfer)
}

function* watchGetTransfers() {
  yield takeEvery(TransfersActionTypes.GET_TRANSFERS_REQUEST, getTransfers)
}

function* watchPerformAction() {
  yield takeEvery(TransfersActionTypes.ACTION_REQUEST, performAction)
}

function* watchCreateTransferDuplicates() {
  yield takeEvery(
    TransfersActionTypes.TRANSFER_DUPLICATE_STUDENTS_REQUEST,
    createTransferDuplicates
  )
}

function* watchExportTransfers() {
  yield takeEvery(TransfersActionTypes.EXPORT_REQUEST, exportTransfers)
}

function* watchGetTransferCount() {
  yield takeEvery(
    TransfersActionTypes.GET_TRANSFER_COUNT_REQUEST,
    getTransferCount
  )
}

function* transfersSaga() {
  yield all([
    fork(watchCreateTransfer),
    fork(watchDeleteTransfer),
    fork(watchGetTransfers),
    fork(watchPerformAction),
    fork(watchCreateTransferDuplicates),
    fork(watchExportTransfers),
    fork(watchGetTransferCount)
  ])
}

export { transfersSaga }
