import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { AdminActionTypes } from './types'
import {
  getClientsFailure,
  getClientsSuccess,
  impersonateFailure,
  impersonateSuccess,
  switchAdminFailure,
  switchAdminSuccess
} from './actions'
import { loginSuccess } from '../../store/auth/actions'
import { callApiGet, callApiPost } from '../../utils/api'
import { authorization } from '../../utils/authorization'
import { secure } from '../../utils/secure'

function* getClients({ payload }: { type: string; payload: string }) {
  try {
    const res = yield call(callApiGet, `admin/clients?academic_year=${payload}`)
    yield put(getClientsSuccess(res.data))
  } catch (err: any) {
    yield put(getClientsFailure(err.response.data))
  }
}

function* impersonate({ payload }: { type: string; payload: any }) {
  try {
    const res = yield call(callApiPost, `admin/clients/impersonate`, payload)
    secure.remove('user')
    secure.set('user', res.data)
    yield authorization(res.data.token)
    yield put(loginSuccess(res.data))
    yield put(impersonateSuccess())
  } catch (err: any) {
    yield put(impersonateFailure(err.response.data))
  }
}

function* switchAdmin({ payload }: { type: string; payload: any }) {
  try {
    const res = yield call(callApiPost, `admin/clients/impersonate`, payload)
    secure.remove('user')
    secure.set('user', res.data)
    yield authorization(res.data.token)
    yield put(loginSuccess(res.data))
    yield put(switchAdminSuccess())
  } catch (err: any) {
    yield put(switchAdminFailure(err.response.data))
  }
}

function* watchGetClients() {
  yield takeEvery(AdminActionTypes.GET_CLIENTS_REQUEST, getClients)
}

function* watchImpersonate() {
  yield takeEvery(AdminActionTypes.IMPERSONATE_REQUEST, impersonate)
}

function* watchSwitchAdmin() {
  yield takeEvery(AdminActionTypes.SWITCH_ADMIN_REQUEST, switchAdmin)
}

function* adminSaga() {
  yield all([
    fork(watchGetClients),
    fork(watchImpersonate),
    fork(watchSwitchAdmin)
  ])
}

export { adminSaga }
