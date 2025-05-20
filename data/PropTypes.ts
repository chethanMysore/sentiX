import {
  NotificationPlacement,
  NotificationTypes,
  UserRoles,
} from "@/constants/DefaultValues";
import { AxiosResponse, AxiosError, AxiosHeaders } from "axios";
import { ModalProps } from "react-native-paper";

export interface AuthProps {
  authState: {
    authenticated: boolean | null;
    username: string | null;
    role: UserRoles | null;
  };
  onLogin: (username: string, password: string) => void;
  onLogout: () => void;
}

export type UserProps = {
  userID?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  emailID?: string;
  phone?: string;
  countryCode?: string;
  role?: string;
  createdAt?: string;
  modifiedAt?: string;
};

export type ModelProps = {
  modelID?: string;
  modelName?: string;
  createdBy?: string;
  createdAt?: string;
  modifiedAt?: string;
};

export type NotificationOptionProps = {
  position?: NotificationPlacement;
  autoClose?: number;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  progress?: string | undefined;
  theme?: string;
};

export type CountryProps = {
  code: string;
  name: string;
};

export type AuthStateProps = {
  authUser: UserProps | null;
  isAuthenticated: boolean;
  role?: string | null;
};

export type AppStateProps = {
  auth: AuthStateProps;
  notification: NotificationStateProps;
  user: UserStateProps;
  model: ModelStateProps;
};

export type UserStateProps = {
  userList: UserProps[];
  selectedUser: UserProps | null;
};

export type ModelStateProps = {
  modelsList: ModelProps[];
  selectedModel: ModelProps | null;
};

export type NotificationStateProps = {
  notificationMessage: string;
  notificationType: string;
  notificationOptions: NotificationOptionProps;
  isError: boolean;
  source: string | null;
  errorMessage: string | null;
  showLoader: boolean;
};

export type NotificationActionProps = {
  message?: string | null;
  source?: string | null;
  errorMessage?: string | null;
  options?: NotificationOptionProps;
};

export type LoaderProps = {
  size?: number | "small" | "large" | undefined;
  color?: string;
};

export type ModalComponentProps = {
  selectedModel: ModelProps | null;
  setModalVisible: (modalVisible: React.SetStateAction<boolean>) => void;
};

export type ActionPayloadProps =
  | UserProps
  | ModelProps
  | NotificationActionProps
  | string
  | null;

export type FiterProps = {
  paramName?: string;
  paramValue?: string;
};

export type ActionProps = {
  type: string;
  payload?: UserProps &
    UserProps[] &
    ModelProps &
    ModelProps[] &
    NotificationActionProps &
    FiterProps &
    ErrorResponse &
    string;
};

export type URLParams = {
  key: string;
  value: string;
};

export type ApiError = {
  isError: boolean;
  message: string;
  status: number;
};

export type APIData = {
  users?: UserProps[];
  models?: ModelProps[];
  user?: UserProps;
  model?: ModelProps;
  role?: string;
};

export type ServerData = string | APIData;

export type ErrorResponse = (Error | AxiosError) & {
  status?: number;
  message?: string;
  isError?: boolean;
  source?: string;
  response?: { data: string };
};

export type APIServerResponse = {
  data: ServerData;
  status: number;
  statusText: string;
};

export type PromiseResult<ServerData, ErrorResponse> =
  | ServerData
  | ErrorResponse;

export type APIPromise = PromiseResult<ServerData, ErrorResponse>;

export interface APICalls {
  getAccessToken: (
    apiBasePath: string,
    tokenPath: string,
    username: string,
    password: string
  ) => Promise<string | ErrorResponse>;
  register: (
    apiBasePath: string,
    registrationPath: string,
    registrationData: UserProps
  ) => Promise<UserProps | ErrorResponse>;
  fetchData: (
    apiBasePath: string,
    entityPath: string,
    byParam?: boolean,
    param?: string,
    queryParams?: URLParams[]
  ) => Promise<ServerData | ErrorResponse>;
  createDataInstance: (
    apiBasePath: string,
    entityPath: string,
    data: ModelProps
  ) => Promise<ServerData | ErrorResponse>;
  updateData: (
    apiBasePath: string,
    entityPath: string,
    data: UserProps | ModelProps,
    byParam?: boolean,
    param?: string
  ) => Promise<ServerData | ErrorResponse>;
}

export interface AuthAPI {
  authenticateUser: (payload: UserProps) => Promise<UserProps | ErrorResponse>;
  registerNewUser: (payload: UserProps) => Promise<UserProps | ErrorResponse>;
  logUserOut: () => Promise<string | ErrorResponse>;
}

export interface UserAPI {
  fetchAllUsers: () => Promise<UserProps[] | ErrorResponse>;
  fetchUserByID: (payload: string) => Promise<UserProps | ErrorResponse>;
  fetchUserByUsername: (payload: string) => Promise<UserProps | ErrorResponse>;
  fetchUsersByName: (payload: string) => Promise<UserProps[] | ErrorResponse>;
  updateUserByID: (payload: UserProps) => Promise<UserProps | ErrorResponse>;
  [key: string]: any;
}

export interface ModelAPI {
  fetchAllModels: () => Promise<ModelProps[] | ErrorResponse>;
  fetchModelByID: (payload: string) => Promise<ModelProps | ErrorResponse>;
  fetchModelsByUsername: (
    payload: string
  ) => Promise<ModelProps[] | ErrorResponse>;
  fetchModelsByName: (payload: string) => Promise<ModelProps[] | ErrorResponse>;
  createNewModel: (payload: ModelProps) => Promise<ModelProps | ErrorResponse>;
  updateModelByID: (payload: ModelProps) => Promise<ModelProps | ErrorResponse>;
  [key: string]: any;
}
