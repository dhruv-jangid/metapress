import { protectedProcedure } from "@/lib/orpc";

import { CommentService } from "./service";

export const getComments = protectedProcedure.comments.getMany.handler(async ({ input }) => {
  return await CommentService.findByBlogId(input.id, input.pageSize, input.cursor);
});

export const createComment = protectedProcedure.comments.create.handler(
  async ({ input, context }) => {
    return await CommentService.create(input, context.user);
  },
);

export const deleteComment = protectedProcedure.comments.delete.handler(
  async ({ input, context }) => {
    await CommentService.delete(input, context.user);
  },
);
