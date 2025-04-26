import {
  APICalls,
  ErrorResponse,
  ModelProps,
  ServerData,
  URLParams,
  UserProps,
} from "@/data/PropTypes";
import axios from "axios";

const buildUrlQuery = (url: string, params: URLParams[]) => {
  let query = "";
  params.forEach((param, i) => {
    i == 0
      ? (query += `?${param.key}=${param.value}`)
      : (query += `&${param.key}=${param.value}`);
  });
  url += query;
  return url;
};

const getTokenFromApi = (
  apiBasePath: string,
  tokenPath: string,
  username: string,
  password: string
) => {
  return new Promise<ServerData | ErrorResponse>((resolve, reject) => {
    let encodeAuth = btoa(`${username}:${password}`);
    let requestUrl = `${apiBasePath}${tokenPath}`;
    const request = axios.create();
    request.defaults.headers.common["Authorization"] = `Basic ${encodeAuth}`;
    request.defaults.withCredentials = true;
    request
      .get<ServerData>(requestUrl)
      .then((res) => resolve(res.data))
      .catch((err: ErrorResponse) => {
        err.isError = true;
        reject(err);
      });
  });
};

const getRequest = (
  apiBasePath: string,
  entityPath: string,
  byParam: boolean = false,
  param: string = "",
  queryParams: URLParams[] = []
) => {
  return new Promise<ServerData | ErrorResponse>((resolve, reject) => {
    let requestUrl = `${apiBasePath}${entityPath}`;
    if (byParam) {
      requestUrl += `/${param}`;
    }
    if (queryParams.length > 0)
      requestUrl = buildUrlQuery(requestUrl, queryParams);
    const request = axios.create();
    request.defaults.withCredentials = true;
    request
      .get<ServerData>(requestUrl)
      .then((res) => resolve(res.data))
      .catch((err: ErrorResponse) => {
        err.isError = true;
        reject(err);
      });
  });
};

const postRequest = (
  apiBasePath: string,
  entityPath: string,
  newData: UserProps | ModelProps
) => {
  return new Promise<ServerData | ErrorResponse>((resolve, reject) => {
    let requestUrl = `${apiBasePath}${entityPath}`;
    const request = axios.create();
    request.defaults.headers.common["ContentType"] = "application/json";
    request.defaults.withCredentials = true;
    request
      .post<ServerData>(requestUrl, newData)
      .then((res) => resolve(res.data))
      .catch((err: ErrorResponse) => {
        err.isError = true;
        reject(err);
      });
  });
};

const putRequest = (
  apiBasePath: string,
  entityPath: string,
  updateData: UserProps | ModelProps,
  byParam: boolean = false,
  param: string = ""
) => {
  return new Promise<ServerData | ErrorResponse>((resolve, reject) => {
    let requestUrl = `${apiBasePath}${entityPath}`;
    if (byParam) {
      requestUrl += `/${param}`;
    }
    const request = axios.create();
    request.defaults.headers.common["ContentType"] = "application/json";
    request.defaults.withCredentials = true;
    request
      .put<ServerData>(requestUrl, updateData)
      .then((res) => resolve(res.data))
      .catch((err: ErrorResponse) => {
        err.isError = true;
        reject(err);
      });
  });
};

export const apiCalls = <APICalls>{
  getAccessToken: async (
    apiBasePath: string,
    tokenPath: string,
    username: string,
    password: string
  ) => {
    return new Promise((resolve, reject) => {
      getTokenFromApi(apiBasePath, tokenPath, username, password)
        .then((res) => {
          resolve(res as string);
        })
        .catch((err: ErrorResponse) => {
          err.isError = true;
          reject(err);
        });
    });
  },
  register: async (
    apiBasePath: string,
    registrationPath: string,
    registrationData: UserProps
  ) => {
    return new Promise((resolve, reject) => {
      postRequest(apiBasePath, registrationPath, registrationData)
        .then((res) => {
          resolve(res as UserProps);
        })
        .catch((err) => {
          err.isError = true;
          reject(err);
        });
    });
  },
  fetchData: async (
    apiBasePath: string,
    entityPath: string,
    byParam: boolean = false,
    param: string = "",
    queryParams: URLParams[] = []
  ) => {
    return new Promise((resolve, reject) => {
      getRequest(apiBasePath, entityPath, byParam, param, queryParams)
        .then((res) => resolve(res))
        .catch((err) => {
          err.isError = true;
          reject(err);
        });
    });
  },
  createDataInstance: async (
    apiBasePath: string,
    entityPath: string,
    data: ModelProps
  ) => {
    return new Promise((resolve, reject) => {
      postRequest(apiBasePath, entityPath, data)
        .then((res) => resolve(res))
        .catch((err) => {
          err.isError = true;
          reject(err);
        });
    });
  },
  updateData: async (
    apiBasePath: string,
    entityPath: string,
    data: UserProps | ModelProps,
    byParam: boolean = false,
    param: string = ""
  ) => {
    return new Promise((resolve, reject) => {
      putRequest(apiBasePath, entityPath, data, byParam, param)
        .then((res) => resolve(res))
        .catch((err) => {
          err.isError = true;
          reject(err);
        });
    });
  },
};
