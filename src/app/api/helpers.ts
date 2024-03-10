import {
  ErrorResponse,
  isCcApiError,
  isFetchBaseQueryError,
} from "../types/api";

export function getMessageFromApiError(error: ErrorResponse["error"]): string {
  let message: string | undefined;
  if (isCcApiError(error)) {
    message = error.details.errors
      ? error.details.errors.map((err) => err.message).join(", ")
      : error.message;
  } else if (!isFetchBaseQueryError(error)) {
    message = error.message;
  } else {
    // TODO:
    // @ts-expect-error
    message = error.error;
  }

  return message ?? "An unknown error occurred.";
}
