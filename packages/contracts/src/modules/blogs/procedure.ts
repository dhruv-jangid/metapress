import { oc } from "@orpc/contract";

import { IdSchema } from "../common";
import {
  BlogsSchema,
  CreateBlogSchema,
  DeleteBlogSchema,
  GetBlogSchema,
  GetFeedSchema,
  LikeUnlikeBlogSchema,
  ReturnBlogSchema,
  UpdateBlogSchema,
} from "./schema";

export const getFeed = oc.route({ method: "GET" }).input(GetFeedSchema).output(BlogsSchema);

export const getBlog = oc.route({ method: "GET" }).input(GetBlogSchema).output(ReturnBlogSchema);

export const createBlog = oc.route({ method: "POST" }).input(CreateBlogSchema).output(IdSchema);

export const updateBlog = oc.route({ method: "PATCH" }).input(UpdateBlogSchema);

export const deleteBlog = oc.route({ method: "DELETE" }).input(DeleteBlogSchema);

export const likeBlog = oc.route({ method: "POST" }).input(LikeUnlikeBlogSchema);

export const unLikeBlog = oc.route({ method: "DELETE" }).input(LikeUnlikeBlogSchema);
