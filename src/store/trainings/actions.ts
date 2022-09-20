import { action } from 'typesafe-actions';
import { Training, School, TrainingList } from '../../interfaces';
import { TrainingsActionTypes } from './types';

export const createTrainingRequest = (payload: Training) =>
  action(TrainingsActionTypes.CREATE_TRAINING_REQUEST, payload);

export const createTrainingSuccess = (training: Training) =>
  action(TrainingsActionTypes.CREATE_TRAINING_SUCCESS, training);

export const createTrainingFailure = (error: any) =>
  action(TrainingsActionTypes.CREATE_TRAINING_FAILURE, error);

export const updateTrainingRequest = (payload: Training) =>
  action(TrainingsActionTypes.UPDATE_TRAINING_REQUEST, payload);

export const updateTrainingSuccess = (data: Training) =>
  action(TrainingsActionTypes.UPDATE_TRAINING_SUCCESS, data);

export const updateTrainingFailure = (error: any) =>
  action(TrainingsActionTypes.UPDATE_TRAINING_FAILURE, error);

export const deleteTrainingRequest = (payload: number) =>
  action(TrainingsActionTypes.DELETE_TRAINING_REQUEST, payload);

export const deleteTrainingSuccess = (data: number) =>
  action(TrainingsActionTypes.DELETE_TRAINING_SUCCESS, data);

export const deleteTrainingFailure = (error: any) =>
  action(TrainingsActionTypes.DELETE_TRAINING_FAILURE, error);

export const getTrainingsRequest = (payload: any) =>
  action(TrainingsActionTypes.GET_TRAININGS_REQUEST, payload);

export const getTrainingsSuccess = (data: Training[]) =>
  action(TrainingsActionTypes.GET_TRAININGS_SUCCESS, data);

export const getTrainingsFailure = (error: any) =>
  action(TrainingsActionTypes.GET_TRAININGS_FAILURE, error);

export const getTainingSchoolsRequest = () =>
  action(TrainingsActionTypes.GET_TRAINING_SCHOOLS_REQUEST);

export const getTainingSchoolsSuccess = (data: School[]) =>
  action(TrainingsActionTypes.GET_TRAINING_SCHOOLS_SUCCESS, data);

export const getTainingSchoolsFailure = (error: any) =>
  action(TrainingsActionTypes.GET_TRAINING_SCHOOLS_FAILURE, error);

export const clearBooleanStates = () =>
  action(TrainingsActionTypes.CLEAR_BOOLEAN_STATES);

export const registerTrainingRequest = (payload: any) =>
  action(TrainingsActionTypes.REGISTER_TRAINING_REQUEST, payload);

export const registerTrainingSuccess = () =>
  action(TrainingsActionTypes.REGISTER_TRAINING_SUCCESS);

export const registerTrainingFailure = (error: any) =>
  action(TrainingsActionTypes.REGISTER_TRAINING_FAILURE, error);

export const getTrainingListsRequest = (payload: Training) =>
  action(TrainingsActionTypes.GET_TRAINING_LIST_REQUEST, payload);

export const getTrainingListsSuccess = (data: TrainingList[]) =>
  action(TrainingsActionTypes.GET_TRAINING_LIST_SUCCESS, data);

export const getTrainingListsFailure = (error: any) =>
  action(TrainingsActionTypes.GET_TRAINING_LIST_FAILURE, error);

export const exportRequest = (payload: any) =>
  action(TrainingsActionTypes.EXPORT_REQUEST, payload);

export const exportSuccess = () => action(TrainingsActionTypes.EXPORT_SUCCESS);

export const exportFailure = (error: any) =>
  action(TrainingsActionTypes.EXPORT_FAILURE, error);
