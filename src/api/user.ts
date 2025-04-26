import {
  apiInferenceBasePath,
  userByIDPath,
  userByUsernamePath,
  userEditByIDPath,
  usersByNamePath,
  usersListPath,
} from "@/constants/DefaultValues";
import { apiCalls } from "../util/apiCalls";
import { ErrorCodes, INVALID_RESPONSE } from "@/constants/Errors";
import {
  APIData,
  ApiError,
  ErrorResponse,
  ServerData,
  UserAPI,
  UserProps,
} from "@/data/PropTypes";

export const userApi: UserAPI = {
  fetchAllUsers: async (payload: null = null) => {
    return new Promise((resolve, reject) => {
      apiCalls
        .fetchData(apiInferenceBasePath, usersListPath)
        .then((res) => {
          const users = (<APIData>(<ServerData>res)).users;
          !!users
            ? resolve(users)
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
  fetchUserByID: async (payload: string) => {
    return new Promise((resolve, reject) => {
      apiCalls
        .fetchData(apiInferenceBasePath, userByIDPath, true, payload)
        .then((res) => {
          const user = (<APIData>(<ServerData>res)).user;
          !!user
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
  fetchUserByUsername: async (payload: string) => {
    return new Promise((resolve, reject) => {
      apiCalls
        .fetchData(apiInferenceBasePath, userByUsernamePath, true, payload)
        .then((res) => {
          const user = (<APIData>(<ServerData>res)).user;
          !!user
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
  fetchUsersByName: async (payload: string) => {
    return new Promise((resolve, reject) => {
      apiCalls
        .fetchData(apiInferenceBasePath, usersByNamePath, true, payload)
        .then((res) => {
          const users = (<APIData>(<ServerData>res)).users;
          !!users
            ? resolve(users)
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
  updateUserByID: async (payload: UserProps) => {
    return new Promise((resolve, reject) => {
      apiCalls
        .updateData(apiInferenceBasePath, userEditByIDPath, payload)
        .then((res) => {
          const user = (<APIData>(<ServerData>res)).user;
          !!user
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
};
