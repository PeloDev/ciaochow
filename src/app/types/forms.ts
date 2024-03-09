import { z } from "zod";

export const RegisterFormSchema = z.object({
  username: z
    .string({ required_error: "Please enter your username." })
    .min(4, "Username must be at least 4 characters long")
    .max(30, "Username must be no more than 30 characters long"),
    // TODO: do we need this regex validation for username?
    // .regex(
    //   /^[a-zA-Z0-9_]+$/,
    //   "Username must be alphanumeric with underscores allowed"
    // ),
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

export type RegisterFormData = z.infer<typeof RegisterFormSchema>;
