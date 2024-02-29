"use client";
import Image from "next/image";
import womanWithGroceries from "../assets/vectors/woman-groceries.svg";
import chevronLeft from "../assets/vectors/chevron-left.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "../components/hookForms/Input";
import Link from "next/link";

const registerFormSchema = z.object({
  username: z
    .string({ required_error: "Please enter your username." })
    .min(4, "Username must be at least 4 characters long")
    .max(20, "Username must be no more than 20 characters long")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username must be alphanumeric with underscores allowed"
    ),
  email: z
    .string({ required_error: "Please enter your email address." })
    .trim()
    .email({ message: "Please enter a valid email format." }),
  password: z
    .string({ required_error: "Please enter a new password." })
    .min(8, "Password should be at least 8 characters long.")
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain at least one uppercase letter.",
      path: [],
    })
    .refine((value) => /[a-z]/.test(value), {
      message: "Password must contain at least one lowercase letter.",
      path: [],
    })
    .refine((value) => /\d/.test(value), {
      message: "Password must contain at least one digit.",
      path: [],
    })
    .refine((value) => /[!@#$%^&*]/.test(value), {
      message:
        "Password must contain at least one special character (!@#$%^&*).",
      path: [],
    })
    .refine((value) => !/\s/.test(value), {
      message: "Password should not contain spaces.",
      path: [],
    }),
});

export default function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
  });

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
      <form onSubmit={onSubmit} className="w-full flex flex-col gap-3">
        <FormInput
          name="username"
          label="username"
          control={control}
          inputProps={{
            placeholder: "chowder",
          }}
        />
        <FormInput
          name="email"
          label="email"
          control={control}
          inputProps={{
            placeholder: "your.email@address.com",
          }}
        />
        <FormInput
          name="password"
          label="password"
          control={control}
          inputProps={{
            placeholder: "••••••••",
            type: "password",
          }}
        />
        <button className="text-white justify-center flex mt-4 bg-ccGreen rounded-[10px] p-[16px] font-semibold text-[18px]">
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
