"use client";
import React, { useEffect } from "react";
import { useLogoutMutation } from "@/lib/redux/api/api-slice";
import { isErrorResponse } from "../types/api";
import { notifyErrorToast } from "@/lib/toast";
import Spinner from "../components/Spinner";
import { useAppDispatch } from "@/lib/redux/hooks";
import { logoutUser } from "@/lib/redux/features/user-slice";
import { useRouter } from "next/navigation";

export default function Logout() {
  const dispatch = useAppDispatch();
  const [logout, { isLoading, error }] = useLogoutMutation();
  const router = useRouter();
  // TODO: fix hydration error
  useEffect(() => {
    const asyncLogout = async () => {
      try {
        const response = await logout();
        if (isErrorResponse(response)) {
          return;
        }
        dispatch(logoutUser());
        router.replace("/welcome");
      } catch (error) {
        notifyErrorToast("Error during logout.");
        // TODO: send to logging service
        console.error(error);
        router.replace("/");
      }
    };
    asyncLogout();
  }, []);

  return (
    <p>
      <Spinner />
      Logging out
    </p>
  );
}
