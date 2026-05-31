import { oc } from "@orpc/contract";

import {
  CreateBlogSchema,
  DeleteBlogSchema,
  GetBlogSchema,
  GetFeedSchema,
  LikeUnlikeBlogSchema,
  UpdateBlogSchema,
} from "../schemas/blog";
import { BlogsSchema, IdSchema, ReturnBlogSchema } from "../schemas/common";

export const getFeed = oc.route({ method: "GET" }).input(GetFeedSchema).output(BlogsSchema);

export const getBlog = oc.route({ method: "GET" }).input(GetBlogSchema).output(ReturnBlogSchema);

export const createBlog = oc.route({ method: "POST" }).input(CreateBlogSchema).output(IdSchema);

export const updateBlog = oc.route({ method: "PATCH" }).input(UpdateBlogSchema);

export const deleteBlog = oc.route({ method: "DELETE" }).input(DeleteBlogSchema);

export const likeBlog = oc.route({ method: "POST" }).input(LikeUnlikeBlogSchema);

export const unLikeBlog = oc.route({ method: "DELETE" }).input(LikeUnlikeBlogSchema);
