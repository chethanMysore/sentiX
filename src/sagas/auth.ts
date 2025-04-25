import { put, all, takeLatest, call } from "redux-saga/effects";
import {
  loginUserSuccess,
  logoutUserSuccess,
  registerUserSuccess,
} from "../actions";
import { handleError, showSuccessNotification } from "../actions/notification";
import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTRATION_SUCCESS,
} from "@/constants/FeedbackMessages";
import { ActionProps, ErrorResponse, UserProps } from "@/data/PropTypes";
import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
} from "@/constants/ActionTypes";
import { authApi } from "../api";

const execLoginAndLinkSideEffects = function* (
  username: string,
  password: string
) {
  try {
    const res: UserProps | ErrorResponse = yield call(
      authApi.authenticateUser,
      {
        username,
        password,
      }
    );
    if (!!(res as UserProps)) {
      const user = <UserProps>res;
      yield all([
        put(showSuccessNotification({ message: LOGIN_SUCCESS })),
        put(loginUserSuccess(user)),
      ]);
    } else {
      const err = <ErrorResponse>res;
      err.source = "execLoginAndLinkSideEffects -> authApi.authenticateUser";
      yield put(handleError(err));
    }
  } catch (error) {
    const err = <ErrorResponse>error;
    err.source = "execLoginAndLinkSideEffects";
    yield put(handleError(err));
  }
};

const execRegisterAndLinkSideEffects = function* (newUser: UserProps) {
  try {
    const res: UserProps | ErrorResponse = yield call(
      authApi.registerNewUser,
      newUser
    );
    if (!!(res as UserProps)) {
      const user = <UserProps>res;
      yield all([
        put(showSuccessNotification({ message: REGISTRATION_SUCCESS })),
        put(registerUserSuccess(user)),
      ]);
    } else {
      const err = <ErrorResponse>res;
      err.source = "execRegisterAndLinkSideEffects -> authApi.registerNewUser";
      yield put(handleError(err));
    }
  } catch (error) {
    const err = <ErrorResponse>error;
    err.source = "execRegisterAndLinkSideEffects";
    yield put(handleError(err));
  }
};

const execLogoutAndLinkSideEffects = function* () {
  try {
    const res: string | ErrorResponse = yield call(authApi.logUserOut);
    if (!!(res as string)) {
      yield all([
        put(showSuccessNotification({ message: LOGOUT_SUCCESS })),
        put(logoutUserSuccess()),
      ]);
    } else {
      const err = <ErrorResponse>res;
      err.source = "execRegisterAndLinkSideEffects -> authApi.logUserOut";
      yield put(handleError(err));
    }
  } catch (error) {
    const err = <ErrorResponse>error;
    err.source = "execRegisterAndLinkSideEffects";
    yield put(handleError(err));
  }
};

export const authSagas = function* () {
  yield takeLatest(LOGIN_USER, (action: ActionProps) =>
    execLoginAndLinkSideEffects(
      action.payload?.username!,
      action.payload?.password!
    )
  );
  yield takeLatest(REGISTER_USER, (action: ActionProps) =>
    execRegisterAndLinkSideEffects(action.payload!)
  );
  yield takeLatest(LOGOUT_USER, (action: ActionProps) =>
    execLogoutAndLinkSideEffects()
  );
};
