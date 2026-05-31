import type { z } from "zod";

import { CreateCommentSchema, DeleteCommentSchema, type CommentSchema } from "./schema";

export type BlogComment = z.infer<typeof CommentSchema>;

export type CreateCommentInput = z.infer<typeof CreateCommentSchema>;

export type DeleteCommentInput = z.infer<typeof DeleteCommentSchema>;
