import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { ActionTypes } from './types'
import academicActions from './actions'
import {
  callApiPost,
  callApiGet,
  callApiDelete,
  callApiPut
} from '../../utils/api'
import {
  CoursePayload,
  AcademicsPayload,
  StudentsPayload
} from '../../interfaces'

function* uploadCourses({ payload }: { type: string; payload: CoursePayload }) {
  try {
    yield call(callApiPost, 'academics/courses/import-courses', payload)
    yield put(academicActions.uploadCoursesSuccess())
  } catch (err: any) {
    yield put(academicActions.uploadCoursesFailure(err.response.data))
  }
}

function* uploadResults({
  payload
}: {
  type: string
  payload: AcademicsPayload
}) {
  try {
    yield call(callApiPost, 'academics/import-results', payload)
    yield put(academicActions.uploadResultsSuccess())
  } catch (err: any) {
    yield put(academicActions.uploadResultsFailure(err.response.data))
  }
}

function* getCourses({ payload }: { type: string; payload: string | number }) {
  try {
    const res = yield call(callApiGet, `academics/courses?school_id=${payload}`)
    yield put(academicActions.getCoursesSuccess(res.data))
  } catch (err: any) {
    yield put(academicActions.getCoursesFailure(err.response.data))
  }
}

function* getResults({ payload }: { type: string; payload: any }) {
  try {
    const res = yield call(
      callApiGet,
      `academics/results/get-results?school_id=${payload.school_id}&course_code=${payload.course_code}`
    )
    yield put(academicActions.getResultsSuccess(res.data))
  } catch (err: any) {
    yield put(academicActions.getResultsFailure(err.response.data))
  }
}

function* getAcademics({
  payload
}: {
  type: string
  payload: string | number
}) {
  try {
    const res = yield call(callApiGet, `academics/get-academics/${payload}`)
    yield put(academicActions.getAcademicsSuccess(res.data))
  } catch (err: any) {
    yield put(academicActions.getAcademicsFailure(err.response.data))
  }
}

function* deleteResult({ payload }: { type: string; payload: number }) {
  try {
    yield call(callApiDelete, 'academics/results', payload)
    yield put(academicActions.deleteResultSuccess())
  } catch (err: any) {
    yield put(academicActions.deleteResultFailure(err.response.data))
  }
}

function* publishResults({ payload }: { type: string; payload: any }) {
  try {
    yield call(callApiPut, `academics/results/publish`, payload, payload.id)
    yield put(academicActions.publishResultSuccess())
  } catch (err: any) {
    yield put(academicActions.publishResultFailure(err.response.data))
  }
}

function* publishStudentResults({ payload }: { type: string; payload: any }) {
  try {
    yield call(callApiPost, `academics/results/publish`, payload)
    yield put(academicActions.publishStudentResultSuccess())
  } catch (err: any) {
    yield put(academicActions.publishStudentResultFailure(err.response.data))
  }
}

function* uploadStudents({
  payload
}: {
  type: string
  payload: StudentsPayload
}) {
  try {
    yield call(callApiPost, 'students/upload/import-results-students', payload)
    yield put(academicActions.uploadStudentsSuccess())
  } catch (err: any) {
    yield put(academicActions.uploadStudentsFailure(err.response.data))
  }
}

function* sendNotification({ payload }: { type: string; payload: any }) {
  try {
    yield call(
      callApiGet,
      `academics/notification/send-sms?school_id=${payload}`
    )
    yield put(academicActions.sendNotificationSuccess())
  } catch (err: any) {
    yield put(academicActions.sendNotificationFailure(err.response.data))
  }
}

function* watchUploadCourses() {
  yield takeEvery(ActionTypes.UPLOAD_COURSES_REQUEST, uploadCourses)
}

function* watchUploadResults() {
  yield takeEvery(ActionTypes.UPLOAD_RESULTS_REQUEST, uploadResults)
}

function* watchGetCourses() {
  yield takeEvery(ActionTypes.GET_COURSES_REQUEST, getCourses)
}

function* watchGetResults() {
  yield takeEvery(ActionTypes.GET_RESULTS_REQUEST, getResults)
}

function* watchGetAcademics() {
  yield takeEvery(ActionTypes.GET_STUDENTS_RESULTS_REQUEST, getAcademics)
}

function* watchDeleteResults() {
  yield takeEvery(ActionTypes.DELETE_RESULTS_REQUEST, deleteResult)
}

function* watchPublishResults() {
  yield takeEvery(ActionTypes.PUBLISH_RESULTS_REQUEST, publishResults)
}

function* watchStudentsResults() {
  yield takeEvery(
    ActionTypes.PUBLISH_STUDENT_RESULTS_REQUEST,
    publishStudentResults
  )
}

function* watchUploadStudents() {
  yield takeEvery(ActionTypes.UPLOAD_STUDENTS_REQUEST, uploadStudents)
}

function* watchSendNotification() {
  yield takeEvery(ActionTypes.SEND_NOTIFICATION_REQUEST, sendNotification)
}

function* academicsSaga() {
  yield all([
    fork(watchUploadCourses),
    fork(watchUploadResults),
    fork(watchGetCourses),
    fork(watchGetResults),
    fork(watchGetAcademics),
    fork(watchDeleteResults),
    fork(watchPublishResults),
    fork(watchStudentsResults),
    fork(watchUploadStudents),
    fork(watchSendNotification)
  ])
}

export { academicsSaga }
