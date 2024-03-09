import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";
import reduxConstants from "../reduxConstants";

export const USER_TOKENS_KEY = "ppi_user_tokens";

function getUserTokens() {
  try {
    const userTokensString = window.localStorage.getItem(USER_TOKENS_KEY);
    if (!userTokensString) {
      throw new Error("Tokens not found");
    }

    const userTokensObject = JSON.parse(userTokensString);

    // check if object is the correct shape
    if (
      typeof userTokensObject?.token !== "string" ||
      typeof userTokensObject?.refreshToken !== "string"
    ) {
      throw new Error("Invalid tokens");
    }

    // check if tokens are valid (can at least be refreshed)
    // TODO: confirm if we even have refresh tokens
    const refreshTokenExp = jwtDecode(userTokensObject.refreshToken)?.exp;

    if ((refreshTokenExp ?? 0) < Math.round(Date.now() / 1000)) {
      throw new Error("Token expired");
    }

    return userTokensObject;
  } catch (error) {
    // TODO: handle errors
    return null;
  }
}

const initialState = getUserTokens() ?? {
  token: "",
  refreshToken: "",
};

const slice = createSlice({
  name: reduxConstants.AUTH.NAME,
  initialState,
  reducers: {
    setTokens: (
      state,
      { payload: { token, refreshToken } }: PayloadAction<{token: string, refreshToken: string}>
    ) => {
      state.token = token || "";
      state.refreshToken = refreshToken || "";
      window.localStorage.setItem(USER_TOKENS_KEY, JSON.stringify({ token, refreshToken }));
    },
    removeTokens: (state) => {
      state.token = "";
      state.refreshToken = "";
      window.localStorage.removeItem(USER_TOKENS_KEY);
    },
  },
});

export const { setTokens, removeTokens } = slice.actions;

export default slice.reducer;
