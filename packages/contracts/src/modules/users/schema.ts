import { z } from "zod";

import { BlogsSchema } from "../blogs";
import { EmailSchema, NameSchema, UsernameSchema } from "../common";

export const UserSchema = z.object({
  id: z.string(),
  name: NameSchema,
  username: UsernameSchema,
  image: z.string().nullable(),
  role: z.string(),
});
export type User = z.infer<typeof UserSchema>;

export const UserWithBlogsSchema = z.object({
  user: z.object({
    id: z.string(),
    name: NameSchema,
    username: UsernameSchema,
    image: z.string().nullable(),
    role: z.string(),
    isSelf: z.boolean(),
    isSelfAdmin: z.boolean(),
  }),
  blogs: z.object({ blogs: BlogsSchema, nextCursor: z.string().nullable() }),
});

export const UserLikedBlogsSchema = z.object({
  blogs: BlogsSchema,
  nextCursor: z.string().nullable(),
});

export const GetUserSchema = z.object({
  username: UsernameSchema,
});

export const ContactUserSchema = z.object({
  email: EmailSchema,
});

export const NewsletterSchema = z.object({
  email: EmailSchema,
});
