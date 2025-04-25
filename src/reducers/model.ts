import {
  ON_CREATE_MODEL_SUCCESS,
  ON_FETCH_ALL_MODELS_SUCCESS,
  ON_FETCH_MODELS_BY_FILTER_SUCCESS,
  ON_FETCH_MODEL_DETAILS_SUCCESS,
  ON_UPDATE_MODEL_DETAILS_SUCCESS,
} from "@/constants/ActionTypes";
import { ActionProps, ModelStateProps } from "@/data/PropTypes";

const INIT_STATE = <ModelStateProps>{
  modelsList: [],
  selectedModel: null,
};

export const modelReducer = (
  state: ModelStateProps = INIT_STATE,
  action: ActionProps
) => {
  switch (action.type) {
    case ON_FETCH_ALL_MODELS_SUCCESS: {
      return Object.assign({}, state, { modelsList: action.payload });
    }
    case ON_FETCH_MODELS_BY_FILTER_SUCCESS: {
      return Object.assign({}, state, { modelsList: action.payload });
    }
    case ON_FETCH_MODEL_DETAILS_SUCCESS: {
      return Object.assign({}, state, { selectedModel: action.payload });
    }
    case ON_CREATE_MODEL_SUCCESS: {
      let newState = { ...state };
      if (action.payload) {
        newState.modelsList = [...state.modelsList, action.payload];
        newState.selectedModel = action.payload;
      }
      return { ...newState };
    }
    case ON_UPDATE_MODEL_DETAILS_SUCCESS: {
      let newState = { ...state };
      if (
        action.payload &&
        state.selectedModel?.modelID === action.payload?.modelID
      ) {
        newState.selectedModel = action.payload;
      }
      return { ...newState };
    }
    default:
      return state;
  }
};
