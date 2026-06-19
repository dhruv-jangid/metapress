import { oc } from "@orpc/contract";

import {
  ContactUserSchema,
  GetUserSchema,
  UserLikedBlogsSchema,
  UserWithBlogsSchema,
} from "./schema";

export const contactUser = oc.route({ method: "POST" }).input(ContactUserSchema);

export const subscribeToNewsletter = oc.route({ method: "POST" }).input(ContactUserSchema);

export const getUserWithBlogs = oc
  .route({ method: "GET" })
  .input(GetUserSchema)
  .output(UserWithBlogsSchema);

export const getUserLikedBlogs = oc.route({ method: "GET" }).output(UserLikedBlogsSchema);
