import { protectedProcedure } from "@/lib/orpc";

import { CommentService } from "./service";

export const getComments = protectedProcedure.comment.getMany.handler(async ({ input }) => {
  return await CommentService.findByBlogId(input.id, input.pageSize, input.cursor);
});

export const createComment = protectedProcedure.comment.create.handler(
  async ({ input, context }) => {
    return await CommentService.create(input, context.user);
  },
);

export const deleteComment = protectedProcedure.comment.delete.handler(
  async ({ input, context }) => {
    await CommentService.delete(input, context.user);
  },
);
