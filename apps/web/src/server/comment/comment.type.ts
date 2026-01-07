import type { z } from "zod";

import type { createCommentSchema, deleteCommentSchema } from "./comment.schema";

declare global {
  type CreateCommentInput = z.infer<typeof createCommentSchema>;
  type CreateComment = CreateCommentInput & {
    userId: string;
    authorName: string;
    authorUsername: string;
    authorImage: string | undefined;
  };

  type DeleteCommentInput = z.infer<typeof deleteCommentSchema>;
  type DeleteComment = DeleteCommentInput & { role: string; userId: string };
}

export {};
