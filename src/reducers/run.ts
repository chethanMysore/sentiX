import {
  CLEAR_MODEL_RUNS_FILTER,
  ON_FETCH_ALL_MODEL_RUNS_SUCCESS,
  ON_FETCH_MODEL_RUNS_BY_FILTER_SUCCESS,
  SET_SELECTED_MODELID_FOR_RUN_FILTER,
  SET_SELECTED_RUNID_FOR_RUN_FILTER,
} from "@/constants/ActionTypes";
import {
  ActionProps,
  ModelRunProps,
  ModelRunStateProps,
} from "@/data/PropTypes";

const INIT_STATE: ModelRunStateProps = {
  modelRuns: [],
  filteredRuns: [],
  selectedRunID: "",
  selectedModelID: "",
  filtered: false,
};

export const modelRunReducer = (
  state: ModelRunStateProps = INIT_STATE,
  action: ActionProps
) => {
  switch (action.type) {
    case ON_FETCH_ALL_MODEL_RUNS_SUCCESS: {
      return Object.assign({}, state, { modelRuns: action.payload });
    }
    case ON_FETCH_MODEL_RUNS_BY_FILTER_SUCCESS: {
      const modelRuns: ModelRunProps[] = action.payload!;
      return Object.assign({}, state, {
        filteredRuns: modelRuns,
        filtered: true,
      });
    }
    case SET_SELECTED_MODELID_FOR_RUN_FILTER: {
      let newState = { ...state };
      const modelID: string = action.payload!;
      newState.selectedModelID = modelID;
      newState.selectedRunID = "";
      newState.filtered = true;
      newState.filteredRuns = newState.modelRuns.filter(
        (run) => run.modelID === modelID
      );
      return { ...newState };
    }
    case SET_SELECTED_RUNID_FOR_RUN_FILTER: {
      let newState = { ...state };
      const runID: string = action.payload!;
      newState.selectedRunID = runID;
      newState.filtered = true;
      newState.filteredRuns = newState.modelRuns.filter(
        (run) => run.runID === runID
      );
      return { ...newState };
    }
    case CLEAR_MODEL_RUNS_FILTER: {
      return Object.assign({}, state, {
        filteredRuns: [],
        selectedRunID: "",
        selectedModelID: "",
        filtered: false,
      });
    }
    default:
      return state;
  }
};
