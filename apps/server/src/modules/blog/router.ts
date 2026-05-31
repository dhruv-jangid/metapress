import { protectedProcedure } from "@/lib/orpc";

import { BlogService } from "./service";

export const getFeed = protectedProcedure.blog.getFeed.handler(async ({ input }) => {
  return BlogService.getFeed(input?.limit);
});

export const getBlog = protectedProcedure.blog.get.handler(async ({ input, context }) => {
  return BlogService.find(input.id, context.user.id);
});

export const createBlog = protectedProcedure.blog.create.handler(async ({ input, context }) => {
  return BlogService.create(input, context.user);
});

export const updateBlog = protectedProcedure.blog.update.handler(async ({ input, context }) => {
  return BlogService.update(input, context.user);
});

export const deleteBlog = protectedProcedure.blog.delete.handler(async ({ input, context }) => {
  return BlogService.delete(input.blogId, context.user);
});

export const likeBlog = protectedProcedure.blog.like.handler(async ({ input, context }) => {
  return BlogService.like(input, context.user);
});

export const unLikeBlog = protectedProcedure.blog.unLike.handler(async ({ input, context }) => {
  return BlogService.unLike(input, context.user);
});
