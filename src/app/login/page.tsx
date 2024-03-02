"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "../components/hookForms/Input";
import {
  chevronLeft,
  manWithGroceries,
  passwordHidden,
  passwordVisible,
} from "../assets/vectors";

const loginFormSchema = z.object({
  email: z
    .string({ required_error: "Please enter your email address." })
    .trim()
    .email({ message: "Please enter a valid email format." }),
  password: z.string({ required_error: "Please enter a new password." }),
});

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = handleSubmit((data) => console.log(data));

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
        <p className="font-bold flex-1 text-[34px] pb-[100px]">Login</p>
        <div className="flex-1">
          <Image
            src={manWithGroceries}
            alt="Happy woman holding a bag of groceries"
            width={129}
            height={316.3}
            priority
          />
        </div>
      </div>
      <form
        autoComplete="off"
        onSubmit={onSubmit}
        className="w-full flex flex-col gap-3"
      >
        <FormInput
          name="email"
          label="email"
          control={control}
          inputProps={{
            placeholder: "your.email@address.com",
          }}
        />
        <div>
          <FormInput
            name="password"
            label="password"
            control={control}
            inputProps={{
              placeholder: "••••••••",
              type: showPassword ? "text" : "password",
              autoComplete: "password",
            }}
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
          <div className="flex justify-end">
            <a
              href="/forgotPassword"
              className="text-ccGreenAlt text-[10px] pt-[6px]"
            >
              Forgot password
            </a>
          </div>
        </div>
        <button className="text-white justify-center flex mt-4 bg-ccGreen rounded-[10px] p-[16px] font-semibold text-[18px] shadow-lg">
          Login
        </button>
      </form>
      <Link href="/register">
        <p className="text-ccGreenAlt text-xs text-center">
          Don't have an account? <span className="font-bold">Register</span>
        </p>
      </Link>
    </div>
  );
}
