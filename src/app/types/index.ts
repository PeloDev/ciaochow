import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { onumber, z } from "zod";

export const UserTokenSchema = z.object({
  token: z.string(),
  refreshToken: z.string()
});

// export type AppUserToken = z.infer<typeof UserTokenSchema>;

export type SuccessResponse = {
  data: any; // TODO: type this properly
};
export type ErrorResponse = {
  error: FetchBaseQueryError | SerializedError;
};
export type ApiResponse = SuccessResponse | ErrorResponse;
export function isErrorResponse(
  response: ApiResponse
): response is ErrorResponse {
  return (response as ErrorResponse).error !== undefined;
}
