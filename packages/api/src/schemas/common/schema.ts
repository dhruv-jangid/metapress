import { z } from "zod";

import type { BlogContent } from "../common";
import { checkProfanity } from "../lib/profanity";
import { BLOG_CATEGORIES, restrictedUsernames } from "./constants";

export const IdSchema = z.string();

export const EmailSchema = z.email("Invalid email address");

export const TitleSchema = z
  .string()
  .trim()
  .min(10, "Title must be atleast 10 characters")
  .max(100, "Title must be under 100 characters")
  .refine((text) => !checkProfanity(text), "Inappropriate Title");

export const ContentSchema = z.custom<BlogContent>();

export const CategorySchema = z.enum(BLOG_CATEGORIES, "Invalid Category");

export const ImageURLSchema = z.url({ hostname: /^res.cloudinary\.com$/, protocol: /^https$/ });

export const UserImageURLSchema = z.string().nullable();

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
  .refine((val) => !restrictedUsernames.has(val), "Username not available")
  .refine((text) => !checkProfanity(text), "Inappropriate Username");

export const BlogSchema = z.object({
  id: IdSchema,
  title: TitleSchema,
  content: ContentSchema,
  cover: ImageURLSchema,
  category: CategorySchema,
  createdAt: z.string("createdAt can't be empty"),
  updatedAt: z.string("updatedAt can't be empty"),
  author: z.object({
    name: NameSchema,
    username: UsernameSchema,
    image: UserImageURLSchema,
  }),
});

export const ReturnBlogSchema = z.object({
  ...BlogSchema.shape,
  likes: z.number().nonnegative(),
  isLiked: z.boolean(),
});

export const BlogsSchema = z.array(BlogSchema);

export const ContactUserSchema = z.object({
  email: EmailSchema,
});

export const NewsletterSchema = z.object({
  email: EmailSchema,
});
