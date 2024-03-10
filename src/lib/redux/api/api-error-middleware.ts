import { notifyErrorToast } from "@/lib/toast";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";

export const rtkQueryErrorNotifier: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const errorResponse = (action.payload as any)?.data as string;
      notifyErrorToast(errorResponse);
    }

    return next(action);
  };
