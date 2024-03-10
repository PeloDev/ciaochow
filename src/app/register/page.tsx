"use client";
import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../components/hookForms/Input";
import Link from "next/link";
import {
  chevronLeft,
  passwordHidden,
  passwordVisible,
  womanWithGroceries,
} from "../assets/vectors";
import { useRegisterMutation } from "@/lib/redux/api/api-slice";
import { RegisterFormData, RegisterFormSchema } from "../types/forms";
import { isErrorResponse } from "../types";
import { useRouter } from "next/navigation";
import { notifySuccessToast } from "@/lib/toast";

export default function Register() {
  const { control, handleSubmit, formState } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const [showPassword, setShowPassword] = React.useState(false);
  // TODO: loading and error states
  const [register, { isLoading, error }] = useRegisterMutation();
  const router = useRouter();
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await register(data);
      if (!isErrorResponse(response)) {
        notifySuccessToast(`"${data.email}" registered succesfully.`);
        setTimeout(() => {
          notifySuccessToast("Please login.", { icon: null });
          router.replace("login");
        }, 1000);
      }
    } catch (error) {
      // TODO: show error toast message
      console.error(error);
    }
  };

  return (
    <div className="px-5 py-9 w-full flex-1 flex flex-col bg-white bg-[center_top_-44px] bg-green_ellipse bg-no-repeat bg-contain gap-8">
      <div className="flex">
        <Link href="/welcome">
          <Image
            src={chevronLeft}
            alt="Back arrow"
            width={24}
            height={24}
            priority
          />
        </Link>
      </div>
      <div className="flex items-end">
        <p className="font-bold flex-1 text-[34px] pb-[100px]">Register</p>
        <div className="flex-1">
          <Image
            src={womanWithGroceries}
            alt="Happy woman holding a bag of groceries"
            width={129}
            height={316.3}
            priority
          />
        </div>
      </div>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-3"
      >
        <FormInput
          name="username"
          label="username"
          control={control}
          inputProps={{
            placeholder: "chowder",
          }}
          isInErrorState={!!error}
        />
        <FormInput
          name="email"
          label="email"
          control={control}
          inputProps={{
            placeholder: "your.email@address.com",
          }}
          isInErrorState={!!error}
        />
        <FormInput
          name="password"
          label="password"
          control={control}
          inputProps={{
            placeholder: "••••••••",
            type: showPassword ? "text" : "password",
            // Browsers may still autocomplete the password field,
            // it turns out this attribute is merely a suggestion that they choose to ignore.
            // See: https://stackoverflow.com/a/63867302
            // TODO: should we just use a different input name, or just keep this behaviour?
            autoComplete: "new-password",
          }}
          isInErrorState={!!error}
          iconRight={
            <button type="button" onClick={togglePasswordVisibility}>
              <Image
                src={showPassword ? passwordVisible : passwordHidden}
                alt={`password ${showPassword ? "visible" : "hidden"} icon`}
                width={24}
                height={20}
                priority
              />
            </button>
          }
        />
        <button className="text-white justify-center flex mt-4 bg-ccGreen rounded-[10px] p-[16px] font-semibold text-[18px] shadow-lg">
          Register
        </button>
      </form>
      <Link href="/login">
        <p className="text-ccGreenAlt text-xs text-center">
          Have an account? <span className="font-bold">Login</span>
        </p>
      </Link>
    </div>
  );
}
