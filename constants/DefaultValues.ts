import { CountryProps, NotificationOptionProps } from "@/data/PropTypes";
// API Base Paths
export const apiTrainBasePath = "http://127.0.0.1:8000";
export const apiInferenceBasePath = "http://localhost:8080/api/v1";
export const homeUrl = "http://localhost:3000";

// Auth Paths
export const authRegisterPath = "/auth/register";
export const authLoginPath = "/auth/login";
export const authTokenPath = "/auth/login";
export const authLogoutPath = "/auth/logout";

// Data Query Paths
// Feedbacks
export const feedbacksDataPath = "/feedbacks/all_feedbacks";
// Users
export const usersListPath = "/users/all";
export const userByIDPath = "/users/id";
export const usersByNamePath = "/users/name";
export const userByUsernamePath = "/users/username";
export const userRoleByIDPath = "/users/auth/id";
export const reloadAuthUser = "/users/auth/user";
// Models
export const modelsListPath = "/models/all";
export const modelByIDPath = "/models/id";
export const modelsByNamePath = "/models/name";
export const modelsByUsernamePath = "/models/username";

// Data Creation/Manipulation Paths
export const userEditByIDPath = "/users/edit";
export const modelCreatePath = "/models/create";
export const modelEditPath = "/models/edit";

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

export enum LoaderColors {
  SUCCESS = "#00ff00",
  INFO = "#0000ff",
}

export enum LoaderSize {
  LARGE = "large",
  SMALL = "small",
}
