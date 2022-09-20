import { Reducer } from 'redux';
import { TrainingsState, TrainingsActionTypes } from './types';
import { AuthActionTypes } from '../auth';
import { constants } from '../../helpers/constants';

export const initialState: TrainingsState = {
  isSubmitting: false,
  deleteSuccess: false,
  error: undefined,
  failure: false,
  isDeleting: false,
  loading: false,
  page: '',
  success: false,
  trainings: [],
  schools: [],
  exportFailure: false,
  exportSuccess: false,
  exporting: false,
  lists: [],
  listsLoading: false,
};

const reducer: Reducer<TrainingsState> = (state = initialState, action) => {
  switch (action.type) {
    case TrainingsActionTypes.CREATE_TRAINING_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        error: null,
        success: false,
        failure: false,
      };
    case TrainingsActionTypes.CREATE_TRAINING_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        success: true,
        failure: false,
        page: constants.trainings,
        trainings: [action.payload, ...state.trainings],
      };
    case TrainingsActionTypes.CREATE_TRAINING_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        success: false,
        failure: true,
        error: action.payload,
        page: constants.trainings,
      };
    case TrainingsActionTypes.UPDATE_TRAINING_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        error: null,
        success: false,
        failure: false,
      };
    case TrainingsActionTypes.UPDATE_TRAINING_SUCCESS:
      let trainings = state.trainings.slice();
      trainings = trainings.filter(
        (training) => training.id !== action.payload.id
      );
      trainings.unshift(action.payload);
      return {
        ...state,
        isSubmitting: false,
        trainings: trainings,
        success: true,
        failure: false,
        page: constants.trainings,
      };
    case TrainingsActionTypes.UPDATE_TRAINING_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        error: action.payload,
        success: false,
        failure: true,
        page: constants.trainings,
      };
    case TrainingsActionTypes.DELETE_TRAINING_REQUEST:
      return {
        ...state,
        isDeleting: true,
        error: null,
        deleteSuccess: false,
      };
    case TrainingsActionTypes.DELETE_TRAINING_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        trainings: state.trainings.filter(
          (training) => training.id !== action.payload
        ),
        deleteSuccess: true,
        page: constants.trainings,
      };
    case TrainingsActionTypes.DELETE_TRAINING_FAILURE:
      return {
        ...state,
        isDeleting: false,
        error: action.payload,
        deleteSuccess: false,
        page: constants.trainings,
      };
    case TrainingsActionTypes.GET_TRAININGS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TrainingsActionTypes.GET_TRAININGS_SUCCESS:
      return {
        ...state,
        loading: false,
        trainings: action.payload,
      };
    case TrainingsActionTypes.GET_TRAININGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case TrainingsActionTypes.GET_TRAINING_SCHOOLS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TrainingsActionTypes.GET_TRAINING_SCHOOLS_SUCCESS:
      return {
        ...state,
        loading: false,
        schools: action.payload,
      };
    case TrainingsActionTypes.GET_TRAINING_SCHOOLS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case TrainingsActionTypes.REGISTER_TRAINING_REQUEST:
      return {
        ...state,
        isSubmitting: true,
        error: null,
        success: false,
        failure: false,
      };
    case TrainingsActionTypes.REGISTER_TRAINING_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        success: true,
        failure: false,
        page: constants.login,
      };
    case TrainingsActionTypes.REGISTER_TRAINING_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        success: false,
        failure: true,
        error: action.payload,
        page: constants.login,
      };
    case TrainingsActionTypes.CLEAR_BOOLEAN_STATES:
      return {
        ...state,
        success: false,
        failure: false,
        deleteSuccess: false,
        isSubmitting: false,
        isDeleting: false,
        error: undefined,
        exporting: false,
        exportFailure: false,
        exportSuccess: false,
      };
    case TrainingsActionTypes.GET_TRAINING_LIST_REQUEST:
      return {
        ...state,
        listsLoading: true,
      };
    case TrainingsActionTypes.GET_TRAINING_LIST_SUCCESS:
      return {
        ...state,
        listsLoading: false,
        lists: action.payload,
      };
    case TrainingsActionTypes.GET_TRAINING_LIST_FAILURE:
      return {
        ...state,
        listsLoading: false,
        error: action.payload,
      };
    case TrainingsActionTypes.EXPORT_REQUEST:
      return {
        ...state,
        exporting: true,
        error: undefined,
      };

    case TrainingsActionTypes.EXPORT_SUCCESS:
      return {
        ...state,
        exporting: false,
        exportSuccess: true,
        exportFailure: false,
        page: constants.trainings,
      };

    case TrainingsActionTypes.EXPORT_FAILURE:
      return {
        ...state,
        exporting: false,
        exportFailure: true,
        exportSuccess: false,
        error: action.payload,
        page: constants.trainings,
      };
    case AuthActionTypes.DESTROY_STATES:
      return initialState;
    default:
      return state;
  }
};

export { reducer as trainingsReducer };
