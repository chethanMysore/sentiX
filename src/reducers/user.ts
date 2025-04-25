import {
  ON_FETCH_ALL_USERS_SUCCESS,
  ON_FETCH_USERS_BY_FILTER_SUCCESS,
  ON_FETCH_USER_DETAILS_SUCCESS,
  ON_UPDATE_USER_DETAILS_SUCCESS,
} from "@/constants/ActionTypes";
import { ActionProps, UserStateProps } from "@/data/PropTypes";

const INIT_STATE = <UserStateProps>{
  userList: [],
  selectedUser: null,
};

export const userReducer = (
  state: UserStateProps = INIT_STATE,
  action: ActionProps
) => {
  switch (action.type) {
    case ON_FETCH_ALL_USERS_SUCCESS: {
      return Object.assign({}, state, { usersList: action.payload });
    }
    case ON_FETCH_USERS_BY_FILTER_SUCCESS: {
      return Object.assign({}, state, { usersList: action.payload });
    }
    case ON_FETCH_USER_DETAILS_SUCCESS: {
      return Object.assign({}, state, { selectedUser: action.payload });
    }
    case ON_UPDATE_USER_DETAILS_SUCCESS: {
      let newState = { ...state };
      if (
        action.payload &&
        newState.selectedUser?.userID === action.payload?.userID
      ) {
        newState.selectedUser = action.payload;
      }
      return { ...newState };
    }
    default:
      return state;
  }
};
