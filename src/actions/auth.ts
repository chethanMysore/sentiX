import {
  ON_LOGIN_USER_SUCCESS,
  ON_LOGOUT_USER_SUCCESS,
  ON_REGISTER_USER_SUCCESS,
} from "@/constants/ActionTypes";
import { UserProps } from "@/constants/PropTypes";

export const registerUser = (user: UserProps) => {
  return { type: ON_REGISTER_USER_SUCCESS, payload: { user } };
};

export const loginUser = (username: string, password: string, role: string) => {
  return { type: ON_LOGIN_USER_SUCCESS, payload: { username, password, role } };
};

export const logoutUser = () => {
  return { type: ON_LOGOUT_USER_SUCCESS };
};
