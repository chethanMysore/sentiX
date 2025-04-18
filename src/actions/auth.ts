import {
  ON_LOGIN_USER_SUCCESS,
  ON_LOGOUT_USER_SUCCESS,
} from "@/constants/ActionTypes";

export const loginUser = (username: string, password: string, role: string) => {
  return { type: ON_LOGIN_USER_SUCCESS, payload: { username, password, role } };
};

export const logoutUser = () => {
  return { type: ON_LOGOUT_USER_SUCCESS };
};
