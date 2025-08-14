import {
  CLEAR_MODEL_RUNS_FILTER,
  FETCH_ALL_MODEL_RUNS,
  FETCH_MODEL_RUNS_BY_FILTER,
  ON_FETCH_ALL_MODEL_RUNS_SUCCESS,
  ON_FETCH_MODEL_RUNS_BY_FILTER_SUCCESS,
  SET_SELECTED_MODELID_FOR_RUN_FILTER,
  SET_SELECTED_RUNID_FOR_RUN_FILTER,
} from "@/constants/ActionTypes";
import { ModelRunProps } from "@/data/PropTypes";

export const fetchAllModelRuns = (payload: null = null) => ({
  type: FETCH_ALL_MODEL_RUNS,
});

export const fetchAllModelRunsSuccess = (modelRuns: ModelRunProps[]) => ({
  type: ON_FETCH_ALL_MODEL_RUNS_SUCCESS,
  payload: modelRuns,
});

export const fetchModelRunsByModelID = (modelID: string) => ({
  type: FETCH_MODEL_RUNS_BY_FILTER,
  payload: { paramName: "modelID", paramValue: modelID },
});

export const fetchModelRunsByFilterSuccess = (modelRuns: ModelRunProps[]) => ({
  type: ON_FETCH_MODEL_RUNS_BY_FILTER_SUCCESS,
  payload: modelRuns,
});

export const setSelectedRunID = (runID: string) => ({
  type: SET_SELECTED_RUNID_FOR_RUN_FILTER,
  payload: runID,
});

export const setSelectedModelID = (modeID: string) => ({
  type: SET_SELECTED_MODELID_FOR_RUN_FILTER,
  payload: modeID,
});

export const clearRunFilters = () => ({
  type: CLEAR_MODEL_RUNS_FILTER,
});
