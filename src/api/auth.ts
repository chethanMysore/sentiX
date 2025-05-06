import {
  apiInferenceBasePath,
  authLoginPath,
  authLogoutPath,
  authRegisterPath,
  userByUsernamePath,
  userRoleByIDPath,
} from "@/constants/DefaultValues";
import {
  ErrorCodes,
  INVALID_RESPONSE,
  USER_ROLE_NOT_DEFINED,
} from "@/constants/Errors";
import {
  AuthAPI,
  UserProps,
  ServerData,
  APIData,
  ErrorResponse,
  ApiError,
} from "@/data/PropTypes";
import { apiCalls } from "@/src/util/apiCalls";

export const authApi = <AuthAPI>{
  authenticateUser: async (payload: UserProps) => {
    return new Promise((resolve, reject) => {
      apiCalls
        .getAccessToken(
          apiInferenceBasePath,
          authLoginPath,
          payload.username!,
          payload.password!
        )
        .then((resData) => {
          apiCalls
            .fetchData(
              apiInferenceBasePath,
              userByUsernamePath,
              true,
              payload.username
            )
            .then((res) => {
              const user = (<APIData>(<ServerData>res)).user;
              const role = (<APIData>(<ServerData>res)).role;
              if (user) {
                if (!!role && role != "") {
                  user.role = role;
                  resolve(user);
                } else {
                  let err = <ApiError>{
                    isError: true,
                    message: USER_ROLE_NOT_DEFINED,
                    status: ErrorCodes.ERROR_UNAUTHORIZED,
                  };
                  reject(err);
                }
              } else {
                let err = <ApiError>{
                  isError: true,
                  message: INVALID_RESPONSE,
                  status: ErrorCodes.ERROR_INTERNAL,
                };
                reject(err);
              }
            })
            .catch((err) => {
              (err.isError = true), reject(err);
            });
        })
        .catch((err) => {
          (err.isError = true), reject(err);
        });
    });
  },
  registerNewUser: async (payload: UserProps) => {
    return new Promise((resolve, reject) => {
      apiCalls
        .register(apiInferenceBasePath, authRegisterPath, payload)
        .then((res) => {
          const user = (<APIData>(<ServerData>res)).user;
          user
            ? resolve(user)
            : reject(<ApiError>{
                isError: true,
                message: INVALID_RESPONSE,
                status: ErrorCodes.ERROR_INTERNAL,
              });
        })
        .catch((err: ErrorResponse) => {
          err.isError = true;
          reject(err);
        });
    });
  },
  logUserOut: async () => {
    return new Promise((resolve, reject) => {
      apiCalls
        .fetchData(apiInferenceBasePath, authLogoutPath)
        .then((res) => resolve(res as string))
        .catch((err: ErrorResponse) => {
          err.isError = true;
          reject(err);
        });
    });
  },
};
