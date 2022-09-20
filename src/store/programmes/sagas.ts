import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { ProgrammesActionTypes } from './types'
import {
  createSuccess,
  createFailure,
  updateSuccess,
  updateFailure,
  deleteSuccess,
  deleteFailure,
  getProgrammesSuccess,
  getProgrammesFailure
} from './actions'
import {
  callApiPost,
  callApiPut,
  callApiGet,
  callApiDelete
} from '../../utils/api'
import { Programme } from '../../interfaces'

function* createProgramme({ payload }: { type: string; payload: Programme }) {
  try {
    const res = yield call(callApiPost, 'programmes', payload)
    yield put(createSuccess(res.data))
  } catch (err: any) {
    yield put(createFailure(err.response.data))
  }
}

function* updateProgramme({ payload }: { type: string; payload: Programme }) {
  try {
    const res = yield call(callApiPut, 'programmes', payload, payload.id)
    yield put(updateSuccess(res.data))
  } catch (err: any) {
    yield put(updateFailure(err.response.data))
  }
}

function* deleteProgramme({ payload }: { type: string; payload: number }) {
  try {
    yield call(callApiDelete, 'programmes', payload)
    yield put(deleteSuccess(payload))
  } catch (err: any) {
    yield put(deleteFailure(err.response.data))
  }
}

function* getProgrammes({ payload }: { type: string; payload: any }) {
  try {
    const res = yield call(
      callApiGet,
      `programmes?school_id=${payload.school_id}&academic_year=${payload.academic_year}`
    )
    yield put(getProgrammesSuccess(res.data))
  } catch (err: any) {
    yield put(getProgrammesFailure(err.response.data))
  }
}

function* watchCreateProgramme() {
  yield takeEvery(ProgrammesActionTypes.CREATE_REQUEST, createProgramme)
}

function* watchUpdateProgramme() {
  yield takeEvery(ProgrammesActionTypes.UPDATE_REQUEST, updateProgramme)
}

function* watchDeleteProgramme() {
  yield takeEvery(ProgrammesActionTypes.DELETE_REQUEST, deleteProgramme)
}

function* watchGetProgrammes() {
  yield takeEvery(ProgrammesActionTypes.GET_PROGRAMMES_REQUEST, getProgrammes)
}

function* programmesSaga() {
  yield all([
    fork(watchCreateProgramme),
    fork(watchUpdateProgramme),
    fork(watchDeleteProgramme),
    fork(watchGetProgrammes)
  ])
}

export { programmesSaga }
