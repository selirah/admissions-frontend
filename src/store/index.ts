import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import { all, fork } from 'redux-saga/effects'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'
import { authSaga } from './auth/sagas'
import { schoolSaga } from './school/sagas'
import { programmesSaga } from './programmes/sagas'
import { feesSaga } from './fees/sagas'
import { letterSaga } from './letter/sagas'
import { studentsSaga } from './students/sagas'
import { transfersSaga } from './transfers/sagas'
import { adminSaga } from './admin/sagas'
import { trainingsSaga } from './trainings/sagas'
import { academicsSaga } from './academics/sagas'

import storage from 'redux-persist/lib/storage'
import { AuthState, authReducer } from './auth'
import { SchoolState, schoolReducer } from './school'
import { ProgrammesState, programmesReducer } from './programmes'
import { FeesState, feesReducer } from './fees'
import { LetterState, letterReducer } from './letter'
import { StudentsState, studentsReducer } from './students'
import { TransfersState, transfersReducer } from './transfers'
import { AdminState, adminReducer } from './admin'
import { TrainingsState, trainingsReducer } from './trainings'
import { AcademicsState, academicsReducer } from './academics'

export type ApplicationState = {
  auth: AuthState
  schoolStore: SchoolState
  programmesStore: ProgrammesState
  feesStore: FeesState
  letterStore: LetterState
  studentsStore: StudentsState
  transfersStore: TransfersState
  adminStore: AdminState
  trainingsStore: TrainingsState
  academicsStore: AcademicsState
  router: RouterState
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'auth',
    'schoolStore',
    'programmesStore',
    'feesStore',
    'letterStore',
    'studentsStore',
    'transfersStore',
    'adminStore',
    'trainingsStore',
    'academicsStore',
    'router'
  ]
}

export const persistingReducer = (history: History) =>
  persistReducer(
    persistConfig,
    combineReducers({
      auth: authReducer,
      schoolStore: schoolReducer,
      programmesStore: programmesReducer,
      feesStore: feesReducer,
      letterStore: letterReducer,
      studentsStore: studentsReducer,
      transfersStore: transfersReducer,
      adminStore: adminReducer,
      trainingsStore: trainingsReducer,
      academicsStore: academicsReducer,
      router: connectRouter(history)
    })
  )

export function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(schoolSaga),
    fork(programmesSaga),
    fork(feesSaga),
    fork(letterSaga),
    fork(studentsSaga),
    fork(transfersSaga),
    fork(adminSaga),
    fork(trainingsSaga),
    fork(academicsSaga)
  ])
}
