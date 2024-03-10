import { cookies } from "next/headers";
import {
  ErrorResponse,
  isCcApiError,
  isFetchBaseQueryError,
} from "../types/api";
import { jwtDecode } from "jwt-decode";

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

export function getAndValidateTokenFromCookies() {
  const token = cookies().get("token")?.value;
  if (!token) {
    return new Response("Unauthorized, please login.", {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  const decodedToken = jwtDecode(token);
  const currentTime = Math.ceil(Date.now() / 1000);
  if ((decodedToken?.exp ?? 0) <= currentTime) {
    return new Response("Token expired, please login.", {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  return token;
}
