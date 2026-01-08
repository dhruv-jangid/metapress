import { z } from "zod";
import { commentContentSchema } from "@/shared/common/common.schema";
import { idSchema } from "../general/general.schema";

export const createCommentSchema = z.object({
  blogId: idSchema,
  content: commentContentSchema,
});

export const deleteCommentSchema = z.object({
  commentId: idSchema,
  blogId: idSchema,
});
