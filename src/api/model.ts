import {
  apiInferenceBasePath,
  modelByIDPath,
  modelCreatePath,
  modelEditPath,
  modelsByNamePath,
  modelsByUsernamePath,
  modelsListPath,
} from "@/constants/DefaultValues";
import { ErrorCodes, INVALID_RESPONSE } from "@/constants/Errors";
import {
  APIData,
  ApiError,
  ErrorResponse,
  ModelAPI,
  ModelProps,
  ServerData,
} from "@/data/PropTypes";
import { apiCalls } from "@/src/util/apiCalls";

export const modelApi: ModelAPI = {
  fetchAllModels: async (payload: null = null) => {
    return new Promise((resolve, reject) => {
      apiCalls
        .fetchData(apiInferenceBasePath, modelsListPath)
        .then((res) => {
          const models = (<APIData>(<ServerData>res)).models;
          !!models
            ? resolve(models)
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
  fetchModelByID: async (payload: string) => {
    return new Promise((resolve, reject) => {
      apiCalls
        .fetchData(apiInferenceBasePath, modelByIDPath, true, payload)
        .then((res) => {
          const model = (<APIData>(<ServerData>res)).model;
          model
            ? resolve(model)
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
  fetchModelsByUsername: async (payload: string) => {
    return new Promise((resolve, reject) => {
      apiCalls
        .fetchData(apiInferenceBasePath, modelsByUsernamePath, true, payload)
        .then((res) => {
          const models = (<APIData>(<ServerData>res)).models;
          models
            ? resolve(models)
            : reject(<ApiError>{
                isError: true,
                message: INVALID_RESPONSE,
                status: ErrorCodes.ERROR_INTERNAL,
              });
        })
        .catch((err) => {
          err.isError = true;
          reject(err);
        });
    });
  },
  fetchModelsByName: async (payload: string) => {
    return new Promise((resolve, reject) => {
      apiCalls
        .fetchData(apiInferenceBasePath, modelsByNamePath, true, payload)
        .then((res) => {
          const models = (<APIData>(<ServerData>res)).models;
          models
            ? resolve(models)
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
  createNewModel: async (payload: ModelProps) => {
    return new Promise((resolve, reject) => {
      apiCalls
        .createDataInstance(apiInferenceBasePath, modelCreatePath, payload)
        .then((res) => {
          const model = (<APIData>(<ServerData>res)).model;
          model
            ? resolve(model)
            : reject(<ApiError>{
                isError: true,
                message: INVALID_RESPONSE,
                status: ErrorCodes.ERROR_INTERNAL,
              });
        })
        .catch((err) => {
          err.isError = true;
          reject(err);
        });
    });
  },
  updateModelByID: async (payload: ModelProps) => {
    return new Promise((resolve, reject) => {
      apiCalls
        .updateData(apiInferenceBasePath, modelEditPath, payload)
        .then((res) => {
          const model = (<APIData>(<ServerData>res)).model;
          model
            ? resolve(model)
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
