import { decodeId } from "@/lib/hashids";
import { isUniqueViolation } from "@/shared/errors/unique-violation";
import { blogCommentsCK, blogCommentsMetaCK, commentCK } from "../cache/cache.key";
import { CacheService } from "../cache/cache.service";
import { COMMENT_TTL, COMMENTS_TTL } from "../cache/cache.ttl";
import { CommentError } from "./comment.error";
import { CommentRepository } from "./comment.repository";

const PAGE_SIZE = 10;

export class CommentService {
  constructor(private readonly user: UserSession) {}

  async findByBlogId(id: string, pageSize = PAGE_SIZE, cursor?: string) {
    const blogId = decodeId(id);
    if (!blogId) {
      throw new CommentError("NOT_FOUND", "Invalid BlogID");
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
        Array<string>,
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

        const comments = ((await pipelineX.execAsPipeline()) as unknown as Array<BlogComment>)
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

    let comments: Array<{
        id: string;
        content: string;
        createdAt: string;
        authorName: string;
        authorUsername: string;
        authorImage: string | null;
      }>,
      nextCursor: string | null;
    try {
      ({ comments, nextCursor } = await CommentRepository.findManyByBlogId(
        blogId,
        pageSize,
        cursor,
      ));
    } catch {
      throw new CommentError("NOT_FOUND", "Comments not found");
    }

    try {
      const pipeline = CacheService.pipeline();
      if (comments.length > 0) {
        comments.forEach((comment) => {
          const flat: Array<string> = [];
          for (const [field, value] of Object.entries(comment)) {
            flat.push(field, String(value));
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

  async create(data: CreateCommentInput) {
    const blogId = decodeId(data.blogId);
    if (!blogId) {
      throw new CommentError("NOT_FOUND", "Invalid BlogID");
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
        userId: this.user.id,
        authorName: this.user.name,
        authorUsername: this.user.username,
        authorImage: this.user.image ?? undefined,
      });
    } catch (error) {
      if (isUniqueViolation(error)) {
        throw new CommentError("ALREADY_EXISTS", error);
      }
      throw new CommentError("CREATE_FAILED", error);
    }

    try {
      const flat: Array<string> = [];
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

  async delete(data: DeleteCommentInput) {
    const blogId = decodeId(data.blogId);
    if (!blogId) {
      throw new CommentError("NOT_FOUND", "Invalid BlogID");
    }

    await CommentRepository.delete({
      commentId: data.commentId,
      blogId,
      role: this.user.role,
      userId: this.user.id,
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
