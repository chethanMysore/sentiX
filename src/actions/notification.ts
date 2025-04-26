import {
  HIDE_LOADER,
  SHOW_LOADER,
  WRITE_ERROR_MESSAGE,
} from "@/constants/ActionTypes";
import { HANDLE_ERROR } from "@/constants/ActionTypes";
import { CLEAR_ERRORS } from "@/constants/ActionTypes";
import {
  DISPLAY_ERROR_MESSAGE,
  DISPLAY_INFO_MESSAGE,
  DISPLAY_SUCCESS_MESSAGE,
  DISPLAY_WARNING_MESSAGE,
  DISPLAY_DEFAULT_MESSAGE,
  CLEAR_NOTIFICATIONS,
} from "@/constants/ActionTypes";
import { ErrorResponse, NotificationActionProps } from "@/data/PropTypes";

export const showErrorNotification = (payload: NotificationActionProps) => ({
  type: DISPLAY_ERROR_MESSAGE,
  payload,
});
export const showInfoNotification = (payload: NotificationActionProps) => ({
  type: DISPLAY_INFO_MESSAGE,
  payload,
});
export const showSuccessNotification = (payload: NotificationActionProps) => ({
  type: DISPLAY_SUCCESS_MESSAGE,
  payload,
});
export const showWarningNotification = (payload: NotificationActionProps) => ({
  type: DISPLAY_WARNING_MESSAGE,
  payload,
});
export const showDefaultNotification = (payload: NotificationActionProps) => ({
  type: DISPLAY_DEFAULT_MESSAGE,
  payload,
});

export const displayErrorPage = (payload: NotificationActionProps) => ({
  type: WRITE_ERROR_MESSAGE,
  payload,
});

export const clearNotifications = (payload: null = null) => ({
  type: CLEAR_NOTIFICATIONS,
});

export const clearErrors = (payload: null = null) => ({ type: CLEAR_ERRORS });

export const showLoader = (payload: null = null) => ({ type: SHOW_LOADER });
export const hideLoader = (payload: null = null) => ({ type: HIDE_LOADER });

export const handleError = (payload: ErrorResponse) => ({
  type: HANDLE_ERROR,
  payload,
});
