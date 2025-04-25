import {
  FETCH_ALL_MODELS,
  FETCH_MODEL_DETAILS,
  UPDATE_MODELS_DATA,
  UPDATE_MODEL_DETAILS,
  CREATE_MODEL,
  FETCH_MODELS_BY_FILTER,
  ON_FETCH_ALL_MODELS_SUCCESS,
  ON_FETCH_MODELS_BY_FILTER_SUCCESS,
  ON_FETCH_MODEL_DETAILS_SUCCESS,
  ON_CREATE_MODEL_SUCCESS,
  ON_UPDATE_MODEL_DETAILS_SUCCESS,
} from "@/constants/ActionTypes";
import { ModelProps, UserProps } from "@/data/PropTypes";

export const fetchAllModels = (payload: null = null) => ({
  type: FETCH_ALL_MODELS,
});

export const fetchAllModelsSuccess = (payload: null = null) => ({
  type: ON_FETCH_ALL_MODELS_SUCCESS,
});

export const fetchModelsByUsername = (username: string) => ({
  type: FETCH_MODELS_BY_FILTER,
  payload: { paramName: "username", paramValue: username },
});

export const fetchModelsByName = (name: string) => ({
  type: FETCH_MODELS_BY_FILTER,
  payload: { paramName: "name", paramValue: name },
});

export const fetchModelsByID = (modelID: string) => ({
  type: FETCH_MODELS_BY_FILTER,
  payload: { paramName: "modelID", paramValue: modelID },
});

export const fetchModelsByFilterSuccess = (models: ModelProps[]) => ({
  type: ON_FETCH_MODELS_BY_FILTER_SUCCESS,
  payload: models,
});

export const fetchModelDetails = (payload: ModelProps) => ({
  type: FETCH_MODEL_DETAILS,
  payload,
});

export const fetchModelDetailsSuccess = (payload: ModelProps) => ({
  type: ON_FETCH_MODEL_DETAILS_SUCCESS,
  payload,
});

export const createNewModel = (payload: ModelProps) => ({
  type: CREATE_MODEL,
  payload,
});

export const createNewModelSuccess = (payload: ModelProps) => ({
  type: ON_CREATE_MODEL_SUCCESS,
  payload,
});

export const updateModelDetails = (payload: ModelProps) => ({
  type: UPDATE_MODEL_DETAILS,
  payload,
});

export const updateModelDetailsSuccess = (payload: ModelProps) => ({
  type: ON_UPDATE_MODEL_DETAILS_SUCCESS,
  payload,
});

export const updateModelInList = (
  modelID: string,
  modelsList: ModelProps[]
) => ({ type: UPDATE_MODELS_DATA, payload: { modelID, modelsList } });
