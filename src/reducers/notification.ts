import {
  CLEAR_ERRORS,
  HIDE_LOADER,
  SHOW_LOADER,
} from "@/constants/ActionTypes";
import {
  DISPLAY_ERROR_MESSAGE,
  DISPLAY_INFO_MESSAGE,
  DISPLAY_SUCCESS_MESSAGE,
  DISPLAY_WARNING_MESSAGE,
  DISPLAY_DEFAULT_MESSAGE,
  CLEAR_NOTIFICATIONS,
  WRITE_ERROR_MESSAGE,
} from "@/constants/ActionTypes";
import { NotificationOptions } from "@/constants/DefaultValues";
import { NotificationTypes } from "@/constants/DefaultValues";
import { ActionProps, NotificationStateProps } from "@/data/PropTypes";

const INIT_STATE = <NotificationStateProps>{
  notificationMessage: "",
  notificationType: NotificationTypes.DEFAULT,
  notificationOptions: NotificationOptions,
  isError: false,
  source: null,
  errorMessage: null,
  showLoader: false,
};

export const notificationReducer = (
  state: NotificationStateProps = INIT_STATE,
  action: ActionProps
) => {
  switch (action.type) {
    case DISPLAY_ERROR_MESSAGE: {
      return {
        ...state,
        notificationType: NotificationTypes.ERROR,
        notificationMessage: action.payload?.message!,
        notificationOptions: {
          ...state.notificationOptions,
          ...action.payload?.options,
        },
      };
    }
    case DISPLAY_INFO_MESSAGE: {
      return {
        ...state,
        notificationType: NotificationTypes.INFO,
        notificationMessage: action.payload?.message!,
        notificationOptions: {
          ...state.notificationOptions,
          ...action.payload?.options,
        },
      };
    }
    case DISPLAY_SUCCESS_MESSAGE: {
      return {
        ...state,
        notificationType: NotificationTypes.SUCCESS,
        notificationMessage: action.payload?.message!,
        notificationOptions: {
          ...state.notificationOptions,
          ...action.payload?.options,
        },
      };
    }
    case DISPLAY_WARNING_MESSAGE: {
      return {
        ...state,
        notificationType: NotificationTypes.WARNING,
        notificationMessage: action.payload?.message!,
        notificationOptions: {
          ...state.notificationOptions,
          ...action.payload?.options,
        },
      };
    }
    case DISPLAY_DEFAULT_MESSAGE: {
      return {
        ...state,
        notificationType: NotificationTypes.DEFAULT,
        notificationMessage: action.payload?.message!,
        notificationOptions: {
          ...state.notificationOptions,
          ...action.payload?.options,
        },
      };
    }
    case CLEAR_NOTIFICATIONS: {
      return {
        ...state,
        notificationType: NotificationTypes.DEFAULT,
        notificationMessage: "",
        notificationOptions: NotificationOptions,
      };
    }
    case WRITE_ERROR_MESSAGE: {
      return {
        ...state,
        isError: true,
        source: action.payload?.source!,
        errorMessage: action.payload?.errorMessage!,
      };
    }
    case CLEAR_ERRORS: {
      return {
        ...state,
        isError: false,
        source: null,
        errorMessage: "",
      };
    }
    case SHOW_LOADER: {
      return {
        ...state,
        showLoader: true,
      };
    }
    case HIDE_LOADER: {
      return {
        ...state,
        showLoader: false,
      };
    }
    default:
      return { ...state };
  }
};
