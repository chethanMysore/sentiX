import { CountryProps, NotificationOptionProps } from "@/constants/PropTypes";

export enum UserRoles {
  ADMIN = "admin",
  USER = "user",
}

export enum UserFilterParams {
  USERID = "id",
  USERNAME = "username",
  NAME = "name",
}

export enum ModelFilterParams {
  MODELID = "id",
  MODELNAME = "name",
  USERNAME = "username",
}

export enum ErrorCodes {
  NOT_FOUND = 0,
  ACCESS_DENIED = 1,
  INVALID_CREDENTIALS = 2,
  ERROR_404 = 404,
  ERROR_401 = 401,
  ERROR_500 = 500,
}

export enum NotificationTypes {
  DEFAULT = "default",
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

export enum NotificationPlacement {
  TOP_LEFT = "top-left",
  TOP_CENTER = "top-center",
  TOP_RIGHT = "top-right",
  BOTTOM_LEFT = "bottom-left",
  BOTTOM_CENTER = "bottom-center",
  BOTTOM_RIGHT = "bottom-right",
}

export enum NotificationTheme {
  LIGHT = "light",
  DARK = "dark",
  COLORED = "colored",
}

export const NotificationOptions = <NotificationOptionProps>{
  position: NotificationPlacement.TOP_LEFT,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const CountryNameAndCodeList = <CountryProps[]>[
  { code: "US", name: "United Stated" },
  { code: "IN", name: "India" },
  { code: "DE", name: "Germany" },
];
