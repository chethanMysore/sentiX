import {
  CLEAR_ERRORS,
  CLEAR_NOTIFICATIONS,
  HANDLE_ERROR,
} from "@/constants/ActionTypes";
import {
  ErrorCodes,
  INVALID_CREDENTIALS,
  SESSION_EXPIRED,
  USER_NOT_FOUND,
} from "@/constants/Errors";
import { ActionProps, ErrorResponse } from "@/data/PropTypes";
import { all, put, takeLatest } from "redux-saga/effects";
import {
  displayErrorPage,
  showErrorNotification,
  showWarningNotification,
} from "../actions/notification";

const clearErrorMessages = function* () {
  yield put({ type: CLEAR_NOTIFICATIONS });
};

const handleErrorSideEffects = function* (err: ErrorResponse) {
  if (!!err && !!err.status) {
    switch (err.status) {
      case ErrorCodes.ERROR_UNAUTHORIZED: {
        const re = new RegExp(`${USER_NOT_FOUND.toLowerCase()}`, "gi");
        if (
          !!err.response &&
          !!err.response.data &&
          !!err.response.data.match(re)
        ) {
          yield all([
            put(showErrorNotification({ message: INVALID_CREDENTIALS })),
          ]);
        } else {
          yield all([
            put(showErrorNotification({ message: SESSION_EXPIRED })),
            put(displayErrorPage({ ...err })),
          ]);
        }
        break;
      }
      default:
        yield all([
          put(showWarningNotification({ message: err.message })),
          put(displayErrorPage({ ...err })),
        ]);
    }
  } else {
    yield all([
      put(showErrorNotification({ message: err.message, source: err.source })),
      put(displayErrorPage({ ...err })),
    ]);
  }
};

export const notificationSagas = function* () {
  yield takeLatest(CLEAR_ERRORS, (action: ActionProps) => clearErrorMessages());
  yield takeLatest(HANDLE_ERROR, (action: ActionProps) =>
    handleErrorSideEffects(<ErrorResponse>action.payload)
  );
};
