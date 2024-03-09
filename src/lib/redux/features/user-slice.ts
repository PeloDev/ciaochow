import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import reduxConstants from "../reduxConstants";
type AppUser = any; // TODO: get from API

export const USER_DATA_KEY = "ppi_user";

const initialState: { data: AppUser | null } = {
  data: null,
};

const slice = createSlice({
  name: reduxConstants.USER.NAME,
  initialState,
  reducers: {
    setUser: (state, { payload: user }: PayloadAction<AppUser>) => {
      state.data = user || null;
    },
    unsetUser: (state) => {
      state.data = null;
    },
  },
});

export const { setUser, unsetUser } = slice.actions;

export default slice.reducer;
