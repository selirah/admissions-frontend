import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { AuthActionTypes } from './types'
import {
  registerSuccess,
  registerFailure,
  loginSuccess,
  loginFailure,
  verifySuccess,
  verifyFailure,
  resendSuccess,
  resendFailure,
  resetSuccess,
  resetFailure,
  changePasswordFailure,
  changePasswordSuccess,
  updateProfileSuccess,
  updateProfileFailure
} from './actions'
import { /*callApiGet*/ callApiPost } from '../../utils/api'
import { Login, Register, Verification, ResendReset } from '../../interfaces'
import { authorization } from '../../utils/authorization'
import { secure } from '../../utils/secure'

function* register({ payload }: { type: string; payload: Register }) {
  try {
    const res = yield call(callApiPost, 'users/sign-up', payload)
    yield put(registerSuccess(res.data))
  } catch (err: any) {
    yield put(registerFailure(err.response.data))
  }
}

function* verify({ payload }: { type: string; payload: Verification }) {
  try {
    yield call(callApiPost, 'users/account-verification', payload)
    yield put(verifySuccess())
  } catch (err: any) {
    yield put(verifyFailure(err.response.data))
  }
}

function* resendCode({ payload }: { type: string; payload: ResendReset }) {
  try {
    yield call(callApiPost, 'users/resend-code', payload)
    yield put(resendSuccess())
  } catch (err: any) {
    yield put(resendFailure(err.response.data))
  }
}

function* resetPassword({ payload }: { type: string; payload: ResendReset }) {
  try {
    yield call(callApiPost, 'users/reset-password', payload)
    yield put(resetSuccess())
  } catch (err: any) {
    yield put(resetFailure(err.response.data))
  }
}

function* login({ payload }: { type: string; payload: Login }) {
  try {
    const res = yield call(callApiPost, 'users/login', payload)
    secure.set('user', res.data)
    yield authorization(res.data.token)
    yield put(loginSuccess(res.data))
  } catch (err: any) {
    yield put(loginFailure(err.response.data))
  }
}

function* updateProfile({ payload }: { type: string; payload: any }) {
  try {
    const res = yield call(callApiPost, 'users/profile', payload)
    yield put(updateProfileSuccess(res.data))
  } catch (err: any) {
    yield put(updateProfileFailure(err.response.data))
  }
}

function* changePassword({ payload }: { type: string; payload: any }) {
  try {
    yield call(callApiPost, 'users/change-password', payload)
    yield put(changePasswordSuccess())
  } catch (err: any) {
    yield put(changePasswordFailure(err.response.data))
  }
}

// function* logout() {
//   try {
//     yield call(callApiGet, 'users/logout');
//   } catch (err) {
//     throw err;
//   }
// }

function* watchRegister() {
  yield takeEvery(AuthActionTypes.SUBMIT_REGISTER_REQUEST, register)
}

function* watchVerify() {
  yield takeEvery(AuthActionTypes.SUBMIT_VERIFICATION_REQUEST, verify)
}

function* watchResendCode() {
  yield takeEvery(AuthActionTypes.SUBMIT_RESEND_REQUEST, resendCode)
}

function* watchResetPassword() {
  yield takeEvery(AuthActionTypes.SUBMIT_RESET_REQUEST, resetPassword)
}

function* watchLogin() {
  yield takeEvery(AuthActionTypes.SUBMIT_LOGIN_REQUEST, login)
}

function* watchUpdateProfile() {
  yield takeEvery(AuthActionTypes.UPDATE_PROFILE_REQUEST, updateProfile)
}

function* watchChangePassword() {
  yield takeEvery(AuthActionTypes.CHANGE_PASSWORD_REQUEST, changePassword)
}

// function* watchLogin() {
//   yield takeEvery(AuthActionTypes.SUBMIT_LOGIN_REQUEST, login);
// }

function* authSaga() {
  yield all([
    fork(watchRegister),
    fork(watchVerify),
    fork(watchResendCode),
    fork(watchResetPassword),
    fork(watchLogin),
    fork(watchUpdateProfile),
    fork(watchChangePassword)
  ])
}

export { authSaga }
