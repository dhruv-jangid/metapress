import { z } from "zod";

import { IdSchema, NameSchema, UserImageURLSchema, UsernameSchema } from "../common";
import { checkProfanity } from "../lib/profanity";

export const CommentContentSchema = z
  .string()
  .min(1, "Comment cannot be empty")
  .max(100, "Comment must be under 100 characters")
  .refine((text) => !checkProfanity(text), "Inappropriate Comment")
  .trim();

export const CommentSchema = z.object({
  id: IdSchema,
  content: CommentContentSchema,
  createdAt: z.string(),
  authorName: NameSchema,
  authorUsername: UsernameSchema,
  authorImage: UserImageURLSchema,
});

export const CommentsSchema = z.object({
  comments: z.array(CommentSchema),
  nextCursor: z.string().nullable(),
});

export const GetCommentsSchema = z.object({
  id: IdSchema,
  pageSize: z.number().max(20).default(10).optional(),
  cursor: z.string().optional(),
});

export const CreateCommentSchema = z.object({
  blogId: IdSchema,
  content: CommentContentSchema,
});

export const DeleteCommentSchema = z.object({
  blogId: IdSchema,
  commentId: IdSchema,
});
