import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/middleware/auth";
import { idSchema } from "../general/general.schema";
import { CommentError, handleCommentError } from "./comment.error";
import { createCommentSchema, deleteCommentSchema } from "./comment.schema";
import { CommentService } from "./comment.service";

export const getComments = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .inputValidator(idSchema)
  .handler(async ({ data, context }) => {
    const commentService = new CommentService(context);
    const { comments } = await commentService.findByBlogId(data);

    return comments;
  });

export const createComment = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(createCommentSchema)
  .handler(async ({ data, context }) => {
    try {
      const commentService = new CommentService(context);
      return await commentService.create(data);
    } catch (error) {
      if (error instanceof CommentError) {
        handleCommentError(error);
      }
      throw new Error("Something went wrong");
    }
  });

export const deleteComment = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(deleteCommentSchema)
  .handler(async ({ data, context }) => {
    try {
      const commentService = new CommentService(context);
      await commentService.delete(data);
    } catch (error) {
      if (error instanceof CommentError) {
        handleCommentError(error);
      }
      throw new Error("Something went wrong");
    }
  });
