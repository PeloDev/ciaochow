import { configureStore } from "@reduxjs/toolkit";
import reduxConstants from "./reduxConstants";

import { apiSlice } from "./api/api-slice";
import favouritesReducer from "./features/favourites-slice";
import userReducer from "./features/user-slice";
import { rtkQueryErrorNotifier } from "./api/api-error-middleware";

export const makeStore = () =>
  configureStore({
    reducer: {
      [reduxConstants.FAVOURITES.NAME]: favouritesReducer,
      [reduxConstants.USER.NAME]: userReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return (
        getDefaultMiddleware()
          // extend default middleware:
          .concat(apiSlice.middleware)
          .concat(rtkQueryErrorNotifier)
      );
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;
