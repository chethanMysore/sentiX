import {
  FETCH_ALL_USERS,
  FETCH_USER_DETAILS,
  FETCH_USERS_BY_FILTER,
  ON_FETCH_ALL_USERS_SUCCESS,
  ON_FETCH_USER_DETAILS_SUCCESS,
  ON_FETCH_USERS_BY_FILTER_SUCCESS,
  ON_UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS,
} from "@/constants/ActionTypes";
import { UserProps } from "@/data/PropTypes";

export const fetchAllUsers = () => ({ type: FETCH_ALL_USERS });

export const fetchAllUsersSuccess = (users: UserProps[]) => ({
  type: ON_FETCH_ALL_USERS_SUCCESS,
  payload: users,
});

export const fetchUserByID = (userID: string) => ({
  type: FETCH_USERS_BY_FILTER,
  payload: { paramName: "userID", paramValue: userID },
});

export const fetchUserByUsername = (username: string) => ({
  type: FETCH_USERS_BY_FILTER,
  payload: { paramName: "username", paramValue: username },
});

export const fetchUsersByName = (name: string) => ({
  type: FETCH_USERS_BY_FILTER,
  payload: { paramName: "name", paramValue: name },
});

export const fetchUsersByFilterSuccess = (users: UserProps[]) => ({
  type: ON_FETCH_USERS_BY_FILTER_SUCCESS,
  payload: users,
});

export const fetchUserDetails = (payload: UserProps) => ({
  type: FETCH_USER_DETAILS,
  payload,
});

export const fetchUserDetailsSuccess = (payload: UserProps) => ({
  type: ON_FETCH_USER_DETAILS_SUCCESS,
  payload,
});

export const updateUserData = (payload: UserProps) => ({
  type: UPDATE_USER_DETAILS,
  payload,
});

export const updateUserDataSuccess = (payload: UserProps) => ({
  type: ON_UPDATE_USER_DETAILS_SUCCESS,
  payload,
});
