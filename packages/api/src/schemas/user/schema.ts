import { z } from "zod";

import { BlogsSchema, NameSchema, UsernameSchema } from "../common";

export const UserSchema = z.object({
  id: z.string(),
  name: NameSchema,
  username: UsernameSchema,
  image: z.string().nullable(),
  role: z.string(),
});

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
