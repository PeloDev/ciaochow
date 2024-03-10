import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import reduxConstants from "../reduxConstants";
import { RootState } from "../store";
import {
  ApiResponse,
  LoginSuccessResponseData,
  RegisterSuccessResponseData,
} from "../../../app/types/api"; // TODO: should this be in lib?
import { LoginFormData, RegisterFormData } from "@/app/types/forms";
import { Action, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const API_BASE_URL = '/api';

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const userTokens = (getState() as RootState).auth;
    if (typeof userTokens.token === "string") {
      headers.set("Authorization", `Bearer ${userTokens.token}`);
    }
    headers.set("Accept", "application/json");
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: reduxConstants.API.NAME,
  baseQuery,
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
  // map out the expected req/res of endpoints from the api
  endpoints: (builder) => {
    return {
      login: builder.mutation<LoginSuccessResponseData, LoginFormData>({
        query: (body) => {
          return {
            url: "auth/login",
            method: "POST",
            body: {
              identifier: body.email,
              password: body.password,
            },
          };
        },
      }),
      logout: builder.mutation<unknown, void>({
        query: () => ({
          url: "auth/logout",
          method: "POST",
        }),
      }),
      register: builder.mutation<RegisterSuccessResponseData, RegisterFormData>(
        {
          query: (body) => {
            return {
              url: "auth/register",
              method: "POST",
              body,
            };
          },
        }
      ),
      forgotPassword: builder.mutation({
        query: (body) => {
          return {
            url: "auth/forgot",
            method: "POST",
            body,
          };
        },
      }),
      getUser: builder.query<ApiResponse, void>({
        query: () => "user",
      }),
      getChows: builder.query<ApiResponse, void>({
        query: () => "chows",
      }),
    };
  },
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useLazyGetUserQuery,
  useLazyGetChowsQuery,
} = apiSlice;
