// Auth
export const MISSING_CREDENTIALS = "Missing Basic Authorization";
export const USER_NOT_FOUND = "No user found with .*";
export const INVALID_CREDENTIALS = "Incorrect Password";
export const MISSING_AUTH = "access_token cookie not found";
export const ACCESS_DENIED = "Access Denied";
export const USER_ROLE_NOT_DEFINED = "User role is not defined";
export const SESSION_EXPIRED = "Session Expired";

// Api
export const MISSING_DETAILS = "EOF";
export const MISSING_FIELD = ".* Error:Field validation .*required.*";
export const INVALID_FIELD_VALUE = ".* Error:Field validation";
export const USER_ALREADY_EXISTS = "User with the user name * already exists";
export const USERS_FILTER_FAILED = "no such user found with .*";
export const MODELS_FILTER_FAILED = "no models found .*";
export const INVALID_RESPONSE = "Invalid Response";

// Navigation
export const PAGE_NOT_FOUND = "404 page not found";

export enum ErrorCodes {
  ERROR_NOT_FOUND = 404,
  ERROR_UNAUTHORIZED = 401,
  ERROR_BAD_REQUEST = 400,
  ERROR_INTERNAL = 500,
}
