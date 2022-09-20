import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { StudentsActionTypes } from './types'
import {
  createSuccess,
  createFailure,
  updateSuccess,
  updateFailure,
  deleteSuccess,
  deleteFailure,
  getStudentsSuccess,
  getStudentsFailure,
  performStudentsActionsSuccess,
  performStudentsActionsFailure,
  studentActionFailure,
  studentActionSuccess,
  uploadStudentsSuccess,
  uploadStudentsFailure,
  exportStudentsSuccess,
  exportStudentsFailure,
  getReceiptStudentsFailure,
  getReceiptStudentsSuccess,
  getFeeStudentsSuccess,
  getFeeStudentsFailure
} from './actions'
import {
  callApiPost,
  callApiPut,
  callApiGet,
  callApiDelete
} from '../../utils/api'
import { Student, StudentAction } from '../../interfaces'

function* createStudent({ payload }: { type: string; payload: Student }) {
  try {
    const res = yield call(callApiPost, 'students', payload)
    yield put(createSuccess(res.data))
  } catch (err: any) {
    yield put(createFailure(err.response.data))
  }
}

function* updateStudent({ payload }: { type: string; payload: Student }) {
  try {
    const res = yield call(callApiPut, 'students', payload, payload.id)
    yield put(updateSuccess(res.data))
  } catch (err: any) {
    yield put(updateFailure(err.response.data))
  }
}

function* deleteStudent({ payload }: { type: string; payload: number }) {
  try {
    yield call(callApiDelete, 'students', payload)
    yield put(deleteSuccess(payload))
  } catch (err: any) {
    yield put(deleteFailure(err.response.data))
  }
}

function* getStudents({ payload }: { type: string; payload: any }) {
  try {
    const res = yield call(
      callApiGet,
      `students?school_id=${payload.school_id}&academic_year=${payload.academic_year}`
    )
    yield put(getStudentsSuccess(res.data))
  } catch (err: any) {
    yield put(getStudentsFailure(err.response.data))
  }
}

function* performStudentsAction({
  payload
}: {
  type: string
  payload: StudentAction
}) {
  try {
    yield call(
      callApiGet,
      `students/actions?school_id=${payload.schoolId}&academic_year=${payload.academicYear}&action=${payload.action}`
    )
    yield put(performStudentsActionsSuccess())
  } catch (err: any) {
    yield put(performStudentsActionsFailure(err.response.data))
  }
}

function* studentAction({ payload }: { type: string; payload: StudentAction }) {
  try {
    yield call(
      callApiGet,
      `students/actions/${payload.studentId}?action=${payload.action}`
    )
    yield put(studentActionSuccess())
  } catch (err: any) {
    yield put(studentActionFailure(err.response.data))
  }
}

function* uploadStudents({ payload }: { type: string; payload: any }) {
  try {
    const res = yield call(callApiPost, 'students/upload', payload)
    yield put(uploadStudentsSuccess(res.data))
  } catch (err: any) {
    yield put(uploadStudentsFailure(err.response.data))
  }
}

function* exportStudents({ payload }: { type: string; payload: any }) {
  try {
    const res = yield call(
      callApiPost,
      `students/actions/export-students`,
      payload
    )
    yield put(exportStudentsSuccess())
    let file = res.data.content
    let fileName = res.data.fileName
    let link = document.createElement('a')

    switch (payload.type) {
      case 'EXCEL':
        link.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${file}`
        link.download = fileName
        link.click()
        break
      case 'PDF':
        link.href = `data:application/pdf;base64,${file}`
        link.download = fileName
        link.click()
        break
    }
  } catch (err: any) {
    yield put(exportStudentsFailure(err.response.data))
  }
}

function* getReceiptStudents({ payload }: { type: string; payload: any }) {
  try {
    const res = yield call(
      callApiGet,
      `students/get-receipt-students?school_id=${payload.school_id}&academic_year=${payload.academic_year}`
    )
    yield put(getReceiptStudentsSuccess(res.data))
  } catch (err: any) {
    yield put(getReceiptStudentsFailure(err.response.data))
  }
}

function* getFeeStudents({ payload }: { type: string; payload: any }) {
  try {
    const res = yield call(
      callApiGet,
      `students/get-fee-students?school_id=${payload.school_id}&academic_year=${payload.academic_year}&type=${payload.type}`
    )
    yield put(getFeeStudentsSuccess(res.data))
  } catch (err: any) {
    yield put(getFeeStudentsFailure(err.response.data))
  }
}

function* watchCreateStudent() {
  yield takeEvery(StudentsActionTypes.CREATE_REQUEST, createStudent)
}

function* watchUpdateStudent() {
  yield takeEvery(StudentsActionTypes.UPDATE_REQUEST, updateStudent)
}

function* watchDeleteStudent() {
  yield takeEvery(StudentsActionTypes.DELETE_REQUEST, deleteStudent)
}

function* watchGetStudents() {
  yield takeEvery(StudentsActionTypes.GET_STUDENTS_REQUEST, getStudents)
}

function* watchPerformStudentsAction() {
  yield takeEvery(
    StudentsActionTypes.STUDENTS_ACTION_REQUEST,
    performStudentsAction
  )
}

function* watchStudentAction() {
  yield takeEvery(StudentsActionTypes.ACTION_REQUEST, studentAction)
}

function* watchUploadStudents() {
  yield takeEvery(StudentsActionTypes.UPLOAD_STUDENTS_REQUEST, uploadStudents)
}

function* watchExportStudents() {
  yield takeEvery(StudentsActionTypes.EXPORT_REQUEST, exportStudents)
}

function* watchGetReceiptStudents() {
  yield takeEvery(
    StudentsActionTypes.GET_RECEIPT_STUDENTS_REQUEST,
    getReceiptStudents
  )
}

function* watchGetFeeStudents() {
  yield takeEvery(StudentsActionTypes.GET_FEE_STUDENTS_REQUEST, getFeeStudents)
}

function* studentsSaga() {
  yield all([
    fork(watchCreateStudent),
    fork(watchUpdateStudent),
    fork(watchDeleteStudent),
    fork(watchGetStudents),
    fork(watchPerformStudentsAction),
    fork(watchStudentAction),
    fork(watchUploadStudents),
    fork(watchExportStudents),
    fork(watchGetReceiptStudents),
    fork(watchGetFeeStudents)
  ])
}

export { studentsSaga }
