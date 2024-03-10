import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { z } from "zod";
import { AppUser } from ".";

interface CcErrorDetails {
  errors?: [
    {
      path: string[];
      message: string;
      name: string;
    }
  ];
}
export interface CcApiError {
  details: CcErrorDetails;
  name: string;
  message: string;
  status: number;
}

export const UserTokenSchema = z.object({
  token: z.string(),
  refreshToken: z.string(),
});

export type RegisterSuccessResponseData = {
  jwt: string;
  user: AppUser;
};

export type LoginSuccessResponseData = {
  jwt: string;
  user: AppUser;
};

export type SuccessResponse = {
  data: RegisterSuccessResponseData | any; // TODO: add others
};
export type ErrorResponse = {
  error: FetchBaseQueryError | SerializedError | CcApiError;
};
export type ApiResponse = SuccessResponse | ErrorResponse;
export function isErrorResponse(
  response: ApiResponse
): response is ErrorResponse {
  return (response as ErrorResponse).error !== undefined;
}

export function isCcApiError(
  error: ErrorResponse["error"]
): error is CcApiError {
  return (error as CcApiError).details !== undefined;
}

export function isFetchBaseQueryError(
  error: ErrorResponse["error"]
): error is FetchBaseQueryError {
  return (error as FetchBaseQueryError).status !== undefined;
}
