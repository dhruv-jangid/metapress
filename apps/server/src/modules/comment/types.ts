import type { CreateCommentInput, DeleteCommentInput } from "@metapress/api/schemas/comment";

export type CreateCommentData = CreateCommentInput & {
  userId: string;
  authorName: string;
  authorUsername: string;
  authorImage: string | undefined;
};

export type DeleteCommentData = DeleteCommentInput & { role: string; userId: string };
