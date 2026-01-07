import { z } from "zod";

import { idSchema } from "../general/general.schema";
import { commentContentSchema } from "@/shared/common/common.schema";

export const createCommentSchema = z.object({
  blogId: idSchema,
  content: commentContentSchema,
});

export const deleteCommentSchema = z.object({
  commentId: idSchema,
  blogId: idSchema,
});
