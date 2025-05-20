import {
  ActionPayloadProps,
  ActionProps,
  ApiError,
  ErrorResponse,
  ModelAPI,
  ModelProps,
  UserAPI,
  UserProps,
} from "@/data/PropTypes";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { handleError, hideLoader } from "../actions/notification";
import {
  CREATE_MODEL,
  FETCH_ALL_MODELS,
  FETCH_ALL_USERS,
  FETCH_MODELS_BY_FILTER,
  FETCH_USERS_BY_FILTER,
  ON_CREATE_MODEL_SUCCESS,
  ON_FETCH_ALL_MODELS_SUCCESS,
  ON_FETCH_ALL_USERS_SUCCESS,
  ON_FETCH_MODEL_DETAILS_SUCCESS,
  ON_FETCH_MODELS_BY_FILTER_SUCCESS,
  ON_FETCH_USER_DETAILS_SUCCESS,
  ON_FETCH_USERS_BY_FILTER_SUCCESS,
  ON_UPDATE_MODEL_DETAILS_SUCCESS,
  ON_UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_MODEL_DETAILS,
  UPDATE_USER_DETAILS,
} from "@/constants/ActionTypes";
import { modelApi, userApi } from "../api";
import { ModelFilterParams, UserFilterParams } from "@/constants/DefaultValues";

const execAndLinkSideEffects = function* (
  api: UserAPI | ModelAPI,
  apiFnName: string,
  fnPayload: ActionPayloadProps,
  successActionType: string
) {
  try {
    const res: UserProps | ModelProps | ErrorResponse = yield call(
      api[apiFnName],
      fnPayload
    );
    if (!!res && (<ErrorResponse>res).isError) {
      const err = <ErrorResponse>res;
      err.source = `execAndLinkSideEffects -> ${typeof api}.${apiFnName}`;
      yield put(handleError(err));
    } else {
      yield all([
        put({
          type: successActionType,
          payload: res as UserProps | ModelProps,
        }),
        put(hideLoader()),
      ]);
    }
  } catch (error) {
    const err = <ErrorResponse>error;
    err.source = "execAndLinkSideEffects";
    yield put(handleError(err));
  }
};

export const apiSagas = function* () {
  yield takeLatest(FETCH_ALL_USERS, (action: ActionProps) =>
    execAndLinkSideEffects(
      userApi,
      "fetchAllUsers",
      null,
      ON_FETCH_ALL_USERS_SUCCESS
    )
  );
  yield takeLatest(FETCH_USERS_BY_FILTER, (action: ActionProps) => {
    switch (action.payload?.paramName) {
      case UserFilterParams.USERID: {
        return execAndLinkSideEffects(
          userApi,
          "fetchUserByID",
          action.payload?.paramValue!,
          ON_FETCH_USER_DETAILS_SUCCESS
        );
      }
      case UserFilterParams.USERNAME: {
        return execAndLinkSideEffects(
          userApi,
          "fetchUserByUsername",
          action.payload?.paramValue!,
          ON_FETCH_USER_DETAILS_SUCCESS
        );
      }
      case UserFilterParams.NAME: {
        return execAndLinkSideEffects(
          userApi,
          "fetchUsersByName",
          action.payload?.paramValue!,
          ON_FETCH_USERS_BY_FILTER_SUCCESS
        );
      }
    }
  });
  yield takeLatest(UPDATE_USER_DETAILS, (action: ActionProps) =>
    execAndLinkSideEffects(
      userApi,
      "updateUserByID",
      action.payload!,
      ON_UPDATE_USER_DETAILS_SUCCESS
    )
  );
  yield takeLatest(FETCH_ALL_MODELS, (action: ActionProps) =>
    execAndLinkSideEffects(
      modelApi,
      "fetchAllModels",
      null,
      ON_FETCH_ALL_MODELS_SUCCESS
    )
  );
  yield takeLatest(FETCH_MODELS_BY_FILTER, (action: ActionProps) => {
    switch (action.payload?.paramName) {
      case ModelFilterParams.MODELID: {
        return execAndLinkSideEffects(
          modelApi,
          "fetchModelByID",
          action.payload?.paramValue!,
          ON_FETCH_MODEL_DETAILS_SUCCESS
        );
      }
      case ModelFilterParams.MODELNAME: {
        return execAndLinkSideEffects(
          modelApi,
          "fetchModelsByName",
          action.payload?.paramValue!,
          ON_FETCH_MODELS_BY_FILTER_SUCCESS
        );
      }
      case ModelFilterParams.USERNAME: {
        return execAndLinkSideEffects(
          modelApi,
          "fetchModelsByUsername",
          action.payload?.paramValue!,
          ON_FETCH_MODELS_BY_FILTER_SUCCESS
        );
      }
    }
  });
  yield takeLatest(CREATE_MODEL, (action: ActionProps) =>
    execAndLinkSideEffects(
      modelApi,
      "createNewModel",
      action.payload!,
      ON_CREATE_MODEL_SUCCESS
    )
  );
  yield takeLatest(UPDATE_MODEL_DETAILS, (action: ActionProps) =>
    execAndLinkSideEffects(
      modelApi,
      "updateModelByID",
      action.payload!,
      ON_UPDATE_MODEL_DETAILS_SUCCESS
    )
  );
};
