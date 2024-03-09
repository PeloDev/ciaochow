import { configureStore } from "@reduxjs/toolkit";
import reduxConstants from "./reduxConstants";

import { apiSlice } from "./api/api-slice";
import authReducer from "./features/auth-slice";
import userReducer from "./features/user-slice";

export const makeStore = () =>
  configureStore({
    reducer: {
      [reduxConstants.AUTH.NAME]: authReducer,
      [reduxConstants.USER.NAME]: userReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return (
        getDefaultMiddleware()
          // extend default middleware:
          .concat(apiSlice.middleware)
      );
    },
  });

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;
