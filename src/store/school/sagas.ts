import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { SchoolActionTypes } from './types'
import {
  createSuccess,
  createFailure,
  updateSuccess,
  updateFailure,
  getSchoolSuccess,
  getSchoolFailure,
  getSchoolsSuccess,
  getSchoolsFailure,
  getCategoriesSuccess,
  getCategoriesFailure,
  addLogoSuccess,
  addLogoFailure,
  addSignatureSuccess,
  addSignatureFailure
} from './actions'
import { callApiPost, callApiPut, callApiGet } from '../../utils/api'
import { School } from '../../interfaces'
import { isEmpty } from '../../helpers/isEmpty'

function* createSchool({ payload }: { type: string; payload: School }) {
  try {
    const res = yield call(callApiPost, 'school', payload)
    yield put(createSuccess(res.data))
  } catch (err: any) {
    yield put(createFailure(err.response.data))
  }
}

function* updateSchool({ payload }: { type: string; payload: School }) {
  try {
    const res = yield call(callApiPut, 'school', payload, payload.id)
    yield put(updateSuccess(res.data))
  } catch (err: any) {
    yield put(updateFailure(err.response.data))
  }
}

function* getSchool() {
  try {
    const res = yield call(callApiGet, 'school')
    if (isEmpty(res.data)) {
      yield put(getSchoolSuccess(null))
    } else {
      yield put(getSchoolSuccess(res.data))
    }
  } catch (err: any) {
    yield put(getSchoolFailure(err.response.data))
  }
}

function* getSchools() {
  try {
    const res = yield call(callApiGet, 'schools')
    yield put(getSchoolsSuccess(res.data))
  } catch (err: any) {
    yield put(getSchoolsFailure(err.response.data))
  }
}

function* getCategories() {
  try {
    const res = yield call(callApiGet, 'category')
    yield put(getCategoriesSuccess(res.data))
  } catch (err: any) {
    yield put(getCategoriesFailure(err.response.data))
  }
}

function* addSchoolLogo({ payload }: { type: string; payload: any }) {
  try {
    const res = yield call(callApiPost, 'school/logo', payload)
    yield put(addLogoSuccess(res.data))
  } catch (err: any) {
    yield put(addLogoFailure(err.response.data))
  }
}

function* addSignature({ payload }: { type: string; payload: any }) {
  try {
    const res = yield call(callApiPost, 'school/signature', payload)
    yield put(addSignatureSuccess(res.data))
  } catch (err: any) {
    yield put(addSignatureFailure(err.response.data))
  }
}

function* watchCreateSchool() {
  yield takeEvery(SchoolActionTypes.CREATE_REQUEST, createSchool)
}

function* watchUpdateSchool() {
  yield takeEvery(SchoolActionTypes.UPDATE_REQUEST, updateSchool)
}

function* watchGetSchool() {
  yield takeEvery(SchoolActionTypes.GET_SCHOOL_REQUEST, getSchool)
}

function* watchGetSchools() {
  yield takeEvery(SchoolActionTypes.GET_SCHOOLS_REQUEST, getSchools)
}

function* watchGetCategories() {
  yield takeEvery(SchoolActionTypes.GET_CATEGORIES_REQUEST, getCategories)
}

function* watchAddSchoolLogo() {
  yield takeEvery(SchoolActionTypes.ADD_LOGO_REQUEST, addSchoolLogo)
}

function* watchAddSignature() {
  yield takeEvery(SchoolActionTypes.ADD_SIGNATURE_REQUEST, addSignature)
}

function* schoolSaga() {
  yield all([
    fork(watchCreateSchool),
    fork(watchUpdateSchool),
    fork(watchGetSchool),
    fork(watchGetSchools),
    fork(watchGetCategories),
    fork(watchAddSchoolLogo),
    fork(watchAddSignature)
  ])
}

export { schoolSaga }
