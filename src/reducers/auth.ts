import {
  ON_LOGIN_USER_SUCCESS,
  ON_LOGOUT_USER_SUCCESS,
} from "@/constants/ActionTypes";
import { ActionProps, AuthStateProps } from "@/constants/PropTypes";
const INIT_STATE = <AuthStateProps>{
  authenticated: false,
  username: undefined,
  role: undefined,
};

export const authReducer = (
  state: AuthStateProps = INIT_STATE,
  action: ActionProps
) => {
  switch (action.type) {
    case ON_LOGIN_USER_SUCCESS: {
      return {
        ...state,
        authenticated: true,
        username: action.payload?.username,
        role: action.payload?.role,
      };
    }
    case ON_LOGOUT_USER_SUCCESS: {
      return {
        ...state,
        authenticated: false,
        username: undefined,
        role: undefined,
      };
    }
    default:
      return state;
  }
};
