import type {
  BlogComment,
  CreateCommentInput,
  DeleteCommentInput,
} from "@metapress/contracts/comments";
import { CommentRepository } from "@metapress/db/comments";
import { isUniqueViolation } from "@metapress/db/utils";
import { ORPCError } from "@orpc/server";

import type { UserSession } from "@/lib/auth";

import { decodeId } from "../../lib/hash-id";
import { blogCommentsCK, blogCommentsMetaCK, commentCK } from "../cache/keys";
import { CacheService } from "../cache/service";
import { COMMENT_TTL, COMMENTS_TTL } from "../cache/ttls";

const PAGE_SIZE = 10;

export abstract class CommentService {
  static async findByBlogId(commentsBlogId: string, pageSize = PAGE_SIZE, cursor?: string) {
    const blogId = decodeId(commentsBlogId);
    if (!blogId) {
      throw new ORPCError("NOT_FOUND");
    }

    const commentsKey = blogCommentsCK(blogId);
    const commentsMetaKey = blogCommentsMetaCK(blogId);
    try {
      const maxScore = cursor ? new Date(cursor).getTime() : +Infinity;

      const pipeline = CacheService.pipeline();
      pipeline.get(commentsMetaKey);
      pipeline.zRange(commentsKey, maxScore, -Infinity, {
        BY: "SCORE",
        REV: true,
        LIMIT: { offset: 0, count: pageSize },
      });

      const [meta, commentIds] = (await pipeline.execAsPipeline()) as unknown as [
        string | null,
        string[],
      ];

      if (meta === "empty") {
        return { comments: [], nextCursor: null };
      }

      if (commentIds.length > 0) {
        const pipelineX = CacheService.pipeline();
        commentIds.forEach((commentId) => {
          const commentKey = commentCK(commentId);
          pipelineX.hGetAll(commentKey);
        });

        const comments = ((await pipelineX.execAsPipeline()) as unknown as BlogComment[])
          .map((r) => ({ ...r }))
          .filter((c) => Object.keys(c).length > 0);

        if (comments.length === commentIds.length) {
          const nextCursor =
            comments.length === pageSize ? comments[comments.length - 1].createdAt : null;

          CacheService.set(commentsMetaKey, "ok", COMMENTS_TTL);

          return { comments, nextCursor };
        }
      }
    } catch {}

    let comments: {
        id: string;
        content: string;
        createdAt: string;
        authorName: string;
        authorUsername: string;
        authorImage: string | null;
      }[],
      nextCursor: string | null;
    try {
      ({ comments, nextCursor } = await CommentRepository.findManyByBlogId(
        blogId,
        pageSize,
        cursor,
      ));
    } catch {
      throw new ORPCError("NOT_FOUND");
    }

    try {
      const pipeline = CacheService.pipeline();
      if (comments.length > 0) {
        comments.forEach((comment) => {
          const flat: string[] = [];
          for (const [field, value] of Object.entries(comment)) {
            flat.push(field, value ?? "");
          }

          const commentKey = commentCK(comment.id);
          pipeline.hSet(commentKey, flat);
          pipeline.expire(commentKey, COMMENT_TTL);
        });

        const members = comments.map((comment) => ({
          score: new Date(comment.createdAt).getTime(),
          value: comment.id,
        }));

        pipeline.set(commentsMetaKey, "ok", {
          expiration: { type: "EX", value: COMMENTS_TTL },
        });
        pipeline.zAdd(commentsKey, members);
      } else {
        pipeline.set(commentsMetaKey, "empty", {
          expiration: { type: "EX", value: COMMENTS_TTL },
        });
      }

      pipeline.expire(commentsKey, COMMENTS_TTL);
      pipeline.execAsPipeline();
    } catch {}

    return { comments, nextCursor };
  }

  static async create(data: CreateCommentInput, user: UserSession) {
    const blogId = decodeId(data.blogId);
    if (!blogId) {
      throw new ORPCError("NOT_FOUND");
    }

    let comment: {
      id: string;
      content: string;
      createdAt: string;
      authorName: string;
      authorUsername: string;
      authorImage: string | null;
    };
    try {
      comment = await CommentRepository.create({
        blogId,
        content: data.content,
        userId: user.id,
        authorName: user.name,
        authorUsername: user.username,
        authorImage: user.image ?? undefined,
      });
    } catch (error) {
      if (isUniqueViolation(error)) {
        throw new ORPCError("ALREADY_EXISTS", error as Error);
      }
      throw new ORPCError("CREATE_FAILED", error as Error);
    }

    try {
      const flat: string[] = [];
      for (const [field, value] of Object.entries(comment)) {
        flat.push(field, String(value));
      }

      const commentKey = commentCK(comment.id);
      const commentsKey = blogCommentsCK(blogId);
      const commentsMetaKey = blogCommentsMetaCK(blogId);

      const transaction = CacheService.pipeline();
      transaction.set(commentsMetaKey, "ok", {
        expiration: { type: "EX", value: COMMENTS_TTL },
      });
      transaction.hSet(commentKey, flat);
      transaction.expire(commentKey, COMMENT_TTL);
      transaction.zAdd(commentsKey, {
        score: new Date(comment.createdAt).getTime(),
        value: comment.id,
      });
      transaction.expire(commentsKey, COMMENTS_TTL);

      await transaction.exec();
    } catch {}

    return comment;
  }

  static async delete(data: DeleteCommentInput, user: UserSession) {
    const blogId = decodeId(data.blogId);
    if (!blogId) {
      throw new ORPCError("NOT_FOUND");
    }

    await CommentRepository.delete({
      commentId: data.commentId,
      blogId,
      role: user.role,
      userId: user.id,
    });

    try {
      const commentKey = commentCK(data.commentId);
      const commentsKey = blogCommentsCK(blogId);

      const transaction = CacheService.pipeline();
      transaction.del(commentKey);
      transaction.zRem(commentsKey, data.commentId);

      await transaction.exec();
    } catch {}
  }
}
