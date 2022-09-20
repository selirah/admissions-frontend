import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { FeesActionTypes } from './types'
import {
  createSuccess,
  createFailure,
  deleteSuccess,
  deleteFailure,
  getFeesSuccess,
  getFeesFailure
} from './actions'
import { callApiPost, callApiGet, callApiDelete } from '../../utils/api'
import { Fee } from '../../interfaces'

function* createFee({ payload }: { type: string; payload: Fee }) {
  try {
    const res = yield call(callApiPost, 'fees', payload)
    yield put(createSuccess(res.data))
  } catch (err: any) {
    yield put(createFailure(err.response.data))
  }
}

function* deleteFee({ payload }: { type: string; payload: number }) {
  try {
    yield call(callApiDelete, 'fees', payload)
    yield put(deleteSuccess(payload))
  } catch (err: any) {
    yield put(deleteFailure(err.response.data))
  }
}

function* getFees({ payload }: { type: string; payload: Fee }) {
  try {
    const res = yield call(
      callApiGet,
      `fees?school_id=${payload.school_id}&academic_year=${payload.academic_year}`
    )
    yield put(getFeesSuccess(res.data))
  } catch (err: any) {
    yield put(getFeesFailure(err.response.data))
  }
}

function* watchCreateFee() {
  yield takeEvery(FeesActionTypes.CREATE_REQUEST, createFee)
}

function* watchDeleteFee() {
  yield takeEvery(FeesActionTypes.DELETE_REQUEST, deleteFee)
}

function* watchGetFees() {
  yield takeEvery(FeesActionTypes.GET_FEES_REQUEST, getFees)
}

function* feesSaga() {
  yield all([fork(watchCreateFee), fork(watchDeleteFee), fork(watchGetFees)])
}

export { feesSaga }
