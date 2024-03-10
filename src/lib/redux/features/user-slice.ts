import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import reduxConstants from "../reduxConstants";
import { AppUser } from "@/app/types";

export const USER_DATA_KEY = "cc_user";

const initialState: { user: AppUser | null } = {
  user: null,
};

const slice = createSlice({
  name: reduxConstants.USER.NAME,
  initialState,
  reducers: {
    loginUser: (state, { payload }: PayloadAction<{ user: AppUser }>) => {
      state.user = payload.user || null;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { loginUser, logoutUser } = slice.actions;

export default slice.reducer;
