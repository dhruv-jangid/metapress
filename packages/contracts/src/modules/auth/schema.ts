import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "@metapress/shared/auth";
import { z } from "zod";

import { EmailSchema } from "../common";
import { NameSchema, UsernameSchema } from "../common";

export const PasswordSchema = z
  .string()
  .min(PASSWORD_MIN_LENGTH, "Password must be at least 8 characters")
  .max(PASSWORD_MAX_LENGTH, "Password must be under 20 characters")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/,
    "Password must include uppercase, lowercase, digit, and special character",
  );

export const SignupSchema = z.object({
  name: NameSchema,
  username: UsernameSchema,
  email: EmailSchema,
  password: PasswordSchema,
});

export const SignInSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
  rememberMe: z.boolean(),
});

export const ForgetPasswordSchema = z.object({ email: EmailSchema });

export const ResetPasswordSchema = z.object({ newPassword: PasswordSchema });
