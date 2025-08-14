import {
  APIData,
  ApiError,
  ErrorResponse,
  ModelRunAPI,
  ServerData,
} from "@/data/PropTypes";
import { apiCalls } from "../util/apiCalls";
import {
  apiInferenceBasePath,
  modelRunsByModelIDPath,
  modelRunsPath,
} from "@/constants/DefaultValues";
import { ErrorCodes, INVALID_RESPONSE } from "@/constants/Errors";

export const modelRunApi: ModelRunAPI = {
  fetchAllModelRuns: async (payload: null = null) => {
    return new Promise((resolve, reject) => {
      apiCalls
        .fetchData(apiInferenceBasePath, modelRunsPath)
        .then((res) => {
          const modelRuns = (<APIData>(<ServerData>res)).modelRuns;
          !!modelRuns ? resolve(modelRuns) : resolve([]);
          // : reject(<ApiError>{
          //     isError: true,
          //     message: INVALID_RESPONSE,
          //     status: ErrorCodes.ERROR_INTERNAL,
          //   });
        })
        .catch((err: ErrorResponse) => {
          err.isError = true;
          reject(err);
        });
    });
  },
  fetchModelRunsByModelID: async (payload: string) => {
    return new Promise((resolve, reject) => {
      apiCalls
        .fetchData(apiInferenceBasePath, modelRunsByModelIDPath, true, payload)
        .then((res) => {
          const modelRuns = (<APIData>(<ServerData>res)).modelRuns;
          !!modelRuns ? resolve(modelRuns) : resolve([]);
          // : reject(<ApiError>{
          //     isError: true,
          //     message: INVALID_RESPONSE,
          //     status: ErrorCodes.ERROR_INTERNAL,
          //   });
        })
        .catch((err: ErrorResponse) => {
          err.isError = true;
          reject(err);
        });
    });
  },
};
