import { Training, School, TrainingList } from '../../interfaces';

export enum TrainingsActionTypes {
  SUBMITTING = '@@trainings/SUBMITTING',
  CREATE_TRAINING_REQUEST = '@@trainings/CREATE_TRAINING_REQUEST',
  CREATE_TRAINING_SUCCESS = '@@trainings/CREATE_TRAINING_SUCCESS',
  CREATE_TRAINING_FAILURE = '@@trainings/CREATE_TRAINING_FAILURE',
  UPDATE_TRAINING_REQUEST = '@@trainings/UPDATE_TRAINING_REQUEST',
  UPDATE_TRAINING_SUCCESS = '@@trainings/UPDATE_TRAINING_SUCCESS',
  UPDATE_TRAINING_FAILURE = '@@trainings/UPDATE_TRAINING_FAILURE',
  DELETE_TRAINING_REQUEST = '@@trainings/DELETE_TRAINING_REQUEST',
  DELETE_TRAINING_SUCCESS = '@@trainings/DELETE_TRAINING_SUCCESS',
  DELETE_TRAINING_FAILURE = '@@trainings/DELETE_TRAINING_FAILURE',
  GET_TRAININGS_REQUEST = '@@trainings/GET_TRAININGS_REQUEST',
  GET_TRAININGS_SUCCESS = '@@trainings/GET_TRAININGS_SUCCESS',
  GET_TRAININGS_FAILURE = '@@trainings/GET_TRAININGS_FAILURE',
  GET_TRAINING_SCHOOLS_REQUEST = '@@trainings/GET_TRAINING_SCHOOLS_REQUEST',
  GET_TRAINING_SCHOOLS_SUCCESS = '@@trainings/GET_TRAINING_SCHOOLS_SUCCESS',
  GET_TRAINING_SCHOOLS_FAILURE = '@@trainings/GET_TRAINING_SCHOOLS_FAILURE',
  REGISTER_TRAINING_REQUEST = '@@trainings/REGISTER_TRAINING_REQUEST',
  REGISTER_TRAINING_SUCCESS = '@@trainings/REGISTER_TRAINING_SUCCESS',
  REGISTER_TRAINING_FAILURE = '@@trainings/REGISTER_TRAINING_FAILURE',
  GET_TRAINING_LIST_REQUEST = '@@trainings/GET_TRAINING_LIST_REQUEST',
  GET_TRAINING_LIST_SUCCESS = '@@trainings/GET_TRAINING_LIST_SUCCESS',
  GET_TRAINING_LIST_FAILURE = '@@trainings/GET_TRAINING_LIST_FAILURE',
  EXPORT_REQUEST = '@@trainings/EXPORT_REQUEST',
  EXPORT_SUCCESS = '@@trainings/EXPORT_SUCCESS',
  EXPORT_FAILURE = '@@trainings/EXPORT_FAILURE',
  CLEAR_BOOLEAN_STATES = '@@trainings/CLEAR_BOOLEAN_STATES',
}

export type TrainingsState = {
  readonly isSubmitting: boolean;
  readonly trainings: Training[];
  readonly error: any;
  readonly success: boolean;
  readonly failure: boolean;
  readonly page: string;
  readonly loading: boolean;
  readonly isDeleting: boolean;
  readonly deleteSuccess: boolean;
  readonly schools: School[];
  readonly lists: TrainingList[];
  readonly listsLoading: boolean;
  readonly exporting: boolean;
  readonly exportSuccess: boolean;
  readonly exportFailure: boolean;
};
