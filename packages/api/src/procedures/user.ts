import { oc } from "@orpc/contract";

import { ContactUserSchema } from "../schemas/common";
import { GetUserSchema, UserLikedBlogsSchema, UserWithBlogsSchema } from "../schemas/user";

export const contactUser = oc.route({ method: "POST" }).input(ContactUserSchema);

export const subscribeToNewsletter = oc.route({ method: "POST" }).input(ContactUserSchema);

export const getUserWithBlogs = oc
  .route({ method: "GET" })
  .input(GetUserSchema)
  .output(UserWithBlogsSchema);

export const getUserLikedBlogs = oc.route({ method: "GET" }).output(UserLikedBlogsSchema);
