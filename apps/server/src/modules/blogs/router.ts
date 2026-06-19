import { protectedProcedure } from "@/lib/orpc";

import { BlogService } from "./service";

export const getFeed = protectedProcedure.blogs.getFeed.handler(async ({ input }) => {
  return BlogService.getFeed(input?.limit);
});

export const getBlog = protectedProcedure.blogs.get.handler(async ({ input, context }) => {
  return BlogService.find(input.id, context.user.id);
});

export const createBlog = protectedProcedure.blogs.create.handler(async ({ input, context }) => {
  return BlogService.create(input, context.user);
});

export const updateBlog = protectedProcedure.blogs.update.handler(async ({ input, context }) => {
  return BlogService.update(input, context.user);
});

export const deleteBlog = protectedProcedure.blogs.delete.handler(async ({ input, context }) => {
  return BlogService.delete(input.blogId, context.user);
});

export const likeBlog = protectedProcedure.blogs.like.handler(async ({ input, context }) => {
  return BlogService.like(input, context.user);
});

export const unLikeBlog = protectedProcedure.blogs.unLike.handler(async ({ input, context }) => {
  return BlogService.unLike(input, context.user);
});
