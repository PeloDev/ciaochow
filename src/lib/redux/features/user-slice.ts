import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import reduxConstants from "../reduxConstants";
import { AppUser } from "@/app/types";
import { LoginSuccessResponseData } from "@/app/types/api";

export const USER_DATA_KEY = "cc_user";

const initialState: { user: AppUser | null; jwt: string | null } = {
  user: null,
  jwt: null,
};

const slice = createSlice({
  name: reduxConstants.USER.NAME,
  initialState,
  reducers: {
    setUser: (state, { payload: user }: PayloadAction<AppUser>) => {
      state.user = user || null;
    },
    unsetUser: (state) => {
      state.user = null;
    },
    loginUser: (
      state,
      { payload }: PayloadAction<LoginSuccessResponseData>
    ) => {
      state.user = payload.user || null;
      state.jwt = payload.jwt || null;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, unsetUser, loginUser, logoutUser } = slice.actions;

export default slice.reducer;
