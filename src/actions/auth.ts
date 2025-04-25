import {
  LOGIN_USER,
  LOGOUT_USER,
  ON_LOGIN_USER_SUCCESS,
  ON_LOGOUT_USER_SUCCESS,
  ON_REGISTER_USER_SUCCESS,
  REGISTER_USER,
} from "@/constants/ActionTypes";
import { UserProps } from "@/data/PropTypes";

export const registerUser = (payload: UserProps) => ({
  type: REGISTER_USER,
  payload,
});

export const registerUserSuccess = (payload: UserProps) => ({
  type: ON_REGISTER_USER_SUCCESS,
  payload,
});

export const loginUser = (payload: UserProps) => ({
  type: LOGIN_USER,
  payload,
});

export const loginUserSuccess = (payload: UserProps) => ({
  type: ON_LOGIN_USER_SUCCESS,
  payload,
});

export const logoutUser = (payload: null = null) => ({
  type: LOGOUT_USER,
});

export const logoutUserSuccess = (payload: null = null) => ({
  type: ON_LOGOUT_USER_SUCCESS,
});
