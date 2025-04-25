import {
  ON_LOGIN_USER_SUCCESS,
  ON_LOGOUT_USER_SUCCESS,
  ON_REGISTER_USER_SUCCESS,
} from "@/constants/ActionTypes";
import { UserRoles } from "@/constants/DefaultValues";
import { ActionProps, AuthStateProps, UserProps } from "@/data/PropTypes";
const INIT_STATE = <AuthStateProps>{
  authUser: null,
  isAuthenticated: false,
  role: null,
};

export const authReducer = (
  state: AuthStateProps = INIT_STATE,
  action: ActionProps
) => {
  switch (action.type) {
    case ON_LOGIN_USER_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        authUser: <UserProps>action.payload,
        role: action.payload?.role,
      };
    }
    case ON_LOGOUT_USER_SUCCESS: {
      return {
        ...state,
        isAuthenticated: false,
        authUser: null,
        role: null,
      };
    }
    case ON_REGISTER_USER_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        authUser: <UserProps>action.payload,
        role: UserRoles.USER,
      };
    }
    default:
      return state;
  }
};
