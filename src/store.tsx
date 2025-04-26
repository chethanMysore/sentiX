import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "@/src/reducers/auth";
import { modelReducer, userReducer } from "./reducers";
import { notificationReducer } from "./reducers/notification";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    model: modelReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
