import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/middleware/auth";
import { idSchema } from "../general/general.schema";
import { BlogError, handleBlogError } from "./blog.error";
import {
  createBlogSchema,
  deleteBlogSchema,
  likeBlogSchema,
  unlikeBlogSchema,
  updateBlogSchema,
} from "./blog.schema";
import { BlogService } from "./blog.service";

export const getBlog = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .inputValidator(idSchema)
  .handler(async ({ data, context }) => {
    try {
      const blogService = new BlogService(context);
      return await blogService.find(data);
    } catch (error) {
      if (error instanceof BlogError) {
        handleBlogError(error);
      }
      throw new Error("Something went wrong");
    }
  });

export const createBlog = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(createBlogSchema)
  .handler(async ({ data, context }) => {
    try {
      const blogService = new BlogService(context);
      return await blogService.create(data);
    } catch (error) {
      if (error instanceof BlogError) {
        handleBlogError(error);
      }
      throw new Error("Something went wrong");
    }
  });

export const editBlog = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(updateBlogSchema)
  .handler(async ({ data, context }) => {
    try {
      const blogService = new BlogService(context);
      await blogService.update(data);
    } catch (error) {
      if (error instanceof BlogError) {
        handleBlogError(error);
      }
      throw new Error("Something went wrong");
    }

    return data.blogId;
  });

export const deleteBlog = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(deleteBlogSchema)
  .handler(async ({ data, context }) => {
    try {
      const blogService = new BlogService(context);
      await blogService.delete(data);
    } catch (error) {
      if (error instanceof BlogError) {
        handleBlogError(error);
      }
      throw new Error("Something went wrong");
    }
  });

export const likeBlog = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(likeBlogSchema)
  .handler(async ({ data, context }) => {
    try {
      const blogService = new BlogService(context);
      await blogService.like(data);
    } catch (error) {
      if (error instanceof BlogError) {
        handleBlogError(error);
      }
      throw new Error("Something went wrong");
    }
  });

export const unlikeBlog = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(unlikeBlogSchema)
  .handler(async ({ data, context }) => {
    try {
      const blogService = new BlogService(context);
      await blogService.unLike(data);
    } catch (error) {
      if (error instanceof BlogError) {
        handleBlogError(error);
      }
      throw new Error("Something went wrong");
    }
  });
