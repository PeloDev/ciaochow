import {
  ApiResponse,
  ErrorResponse,
  isCcApiError,
  isErrorResponse,
  isFetchBaseQueryError,
} from "@/app/types/api";
import { notifyErrorToast } from "@/lib/toast";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";

function getMessageFromApiError(error: ErrorResponse["error"]): string {
  let message: string | undefined;
  if (isCcApiError(error)) {
    message = error.details.errors
      ? error.details.errors.map((err) => err.message).join(", ")
      : error.message;
  } else if (!isFetchBaseQueryError(error)) {
    message = error.message;
  } else {
    // @ts-expect-error
    message = error.error;
  }

  return message ?? "An unknown error occurred.";
}

export const rtkQueryErrorNotifier: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const response = (action.payload as any)?.data as ApiResponse;
      if (isErrorResponse(response)) {
        const errorMessage = getMessageFromApiError(response.error);
        notifyErrorToast(errorMessage);
      }
    }

    return next(action);
  };
