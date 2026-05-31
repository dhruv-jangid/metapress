import { oc } from "@orpc/contract";

import {
  CommentSchema,
  CommentsSchema,
  CreateCommentSchema,
  DeleteCommentSchema,
  GetCommentsSchema,
} from "../schemas/comment";

export const getComments = oc
  .route({ method: "GET" })
  .input(GetCommentsSchema)
  .output(CommentsSchema);

export const createComment = oc
  .route({ method: "POST" })
  .input(CreateCommentSchema)
  .output(CommentSchema);

export const deleteComment = oc.route({ method: "DELETE" }).input(DeleteCommentSchema);
