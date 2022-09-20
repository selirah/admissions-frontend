import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { TrainingsActionTypes } from './types'
import {
  createTrainingSuccess,
  createTrainingFailure,
  updateTrainingSuccess,
  updateTrainingFailure,
  deleteTrainingSuccess,
  deleteTrainingFailure,
  getTrainingsSuccess,
  getTrainingsFailure,
  getTainingSchoolsFailure,
  getTainingSchoolsSuccess,
  registerTrainingSuccess,
  registerTrainingFailure,
  getTrainingListsFailure,
  getTrainingListsSuccess,
  exportFailure,
  exportSuccess
} from './actions'
import {
  callApiPost,
  callApiPut,
  callApiGet,
  callApiDelete
} from '../../utils/api'
import { Training } from '../../interfaces'

function* createTraining({ payload }: { type: string; payload: Training }) {
  try {
    const res = yield call(callApiPost, 'trainings', payload)
    yield put(createTrainingSuccess(res.data))
  } catch (err: any) {
    yield put(createTrainingFailure(err.response.data))
  }
}

function* updateTraining({ payload }: { type: string; payload: Training }) {
  try {
    const res = yield call(callApiPut, 'trainings', payload, payload.id)
    yield put(updateTrainingSuccess(res.data))
  } catch (err: any) {
    yield put(updateTrainingFailure(err.response.data))
  }
}

function* deleteTraining({ payload }: { type: string; payload: number }) {
  try {
    yield call(callApiDelete, 'trainings', payload)
    yield put(deleteTrainingSuccess(payload))
  } catch (err: any) {
    yield put(deleteTrainingFailure(err.response.data))
  }
}

function* getTrainings({ payload }: { type: string; payload: any }) {
  try {
    const res = yield call(callApiGet, `trainings?year=${payload.year}`)
    yield put(getTrainingsSuccess(res.data))
  } catch (err: any) {
    yield put(getTrainingsFailure(err.response.data))
  }
}

function* getTrainingSchools() {
  try {
    const res = yield call(callApiGet, 'trainings/schools')
    yield put(getTainingSchoolsSuccess(res.data))
  } catch (err: any) {
    yield put(getTainingSchoolsFailure(err.response.data))
  }
}

function* registerTraining({ payload }: { type: string; payload: Training }) {
  try {
    yield call(callApiPost, 'training-list', payload)
    yield put(registerTrainingSuccess())
  } catch (err: any) {
    yield put(registerTrainingFailure(err.response.data))
  }
}

function* getTrainingLists({ payload }: { type: string; payload: Training }) {
  try {
    const res = yield call(
      callApiGet,
      `training-list?training_id=${payload.id}&year=${payload.year}`
    )
    yield put(getTrainingListsSuccess(res.data))
  } catch (err: any) {
    yield put(getTrainingListsFailure(err.response.data))
  }
}

function* exportTrainingLists({ payload }: { type: string; payload: any }) {
  try {
    const res = yield call(callApiPost, `training-list/export`, payload)
    yield put(exportSuccess())
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
    yield put(exportFailure(err.response.data))
  }
}

function* watchCreateTraining() {
  yield takeEvery(TrainingsActionTypes.CREATE_TRAINING_REQUEST, createTraining)
}

function* watchUpdateTraining() {
  yield takeEvery(TrainingsActionTypes.UPDATE_TRAINING_REQUEST, updateTraining)
}

function* watchDeleteTraining() {
  yield takeEvery(TrainingsActionTypes.DELETE_TRAINING_REQUEST, deleteTraining)
}

function* watchGetTrainings() {
  yield takeEvery(TrainingsActionTypes.GET_TRAININGS_REQUEST, getTrainings)
}

function* watchGetTrainingSchools() {
  yield takeEvery(
    TrainingsActionTypes.GET_TRAINING_SCHOOLS_REQUEST,
    getTrainingSchools
  )
}

function* watchRegisterTraining() {
  yield takeEvery(
    TrainingsActionTypes.REGISTER_TRAINING_REQUEST,
    registerTraining
  )
}

function* watchGetTrainingLists() {
  yield takeEvery(
    TrainingsActionTypes.GET_TRAINING_LIST_REQUEST,
    getTrainingLists
  )
}

function* watchExportTrainingLists() {
  yield takeEvery(TrainingsActionTypes.EXPORT_REQUEST, exportTrainingLists)
}

function* trainingsSaga() {
  yield all([
    fork(watchCreateTraining),
    fork(watchUpdateTraining),
    fork(watchDeleteTraining),
    fork(watchGetTrainings),
    fork(watchGetTrainingSchools),
    fork(watchRegisterTraining),
    fork(watchGetTrainingLists),
    fork(watchExportTrainingLists)
  ])
}

export { trainingsSaga }
