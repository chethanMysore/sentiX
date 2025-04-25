import { all } from "redux-saga/effects";
import { authSagas } from "./auth";
import { apiSagas } from "./api";
import { notificationSagas } from "./notification";

export default function* rootSaga() {
  yield all([authSagas(), apiSagas(), notificationSagas()]);
}
