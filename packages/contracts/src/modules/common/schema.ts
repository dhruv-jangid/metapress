import { RESTRICTED_USERNAMES } from "@metapress/shared/users";
import { checkProfanity } from "@metapress/shared/utils";
import { z } from "zod";

export const IdSchema = z.string();

export const EmailSchema = z.email("Invalid email address");

export const NameSchema = z
  .string()
  .min(3, "Name must be at least 3 characters")
  .max(50, "Name must be under 50 characters")
  .regex(/^[a-zA-Z0-9 ]+$/, "Name can only contain letters, numbers, and spaces")
  .refine((text) => !checkProfanity(text), "Inappropriate Name");

export const UsernameSchema = z
  .string()
  .min(3, "Username must have atleast 3 characters")
  .max(30, "Username must be under 30 characters")
  .regex(/^(?!.*__)(?!.*_$)[a-z0-9](?:[a-z0-9_]*[a-z0-9])?$/, "Invalid Username")
  .refine((val) => !RESTRICTED_USERNAMES.has(val), "Username not available")
  .refine((text) => !checkProfanity(text), "Inappropriate Username");
