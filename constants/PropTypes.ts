import { NotificationPlacement, UserRoles } from "./DefaultValues";

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
  emailID?: string;
  phone?: string;
  countryCode?: string;
  role?: UserRoles;
};

export type ModelProps = {
  modelID: string;
  modelName: string;
  createdBy: string;
  createdAt: string;
  modifiedAt: string;
};

export type NotificationOptionProps = {
  position: NotificationPlacement;
  autoClose: number;
  hideProgressBar: boolean;
  closeOnClick: boolean;
  pauseOnHover: boolean;
  draggable: boolean;
  progress: string | undefined;
  theme: string;
};

export type CountryProps = {
  code: string;
  name: string;
};

export type ActionProps = {
  type: string;
  payload?: UserProps & ModelProps & string;
};

export type AuthStateProps = {
  authenticated: boolean;
  username?: string;
  role?: UserRoles;
};

export type AppStateProps = {
  auth: AuthStateProps;
};
