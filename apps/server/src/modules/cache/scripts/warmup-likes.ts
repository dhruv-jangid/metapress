import { db } from "@metapress/db";
import { likes } from "@metapress/db/schemas";
import { useLogger } from "@metapress/logger";

import { blogLikesCK, blogLikesCountCK, userLikedCK, userLikedMetaCK } from "../keys";
import { CacheService } from "../service";
import { USER_LIKED_BLOGS_TTL } from "../ttls";

const logger = useLogger("server", "cache", "warmup");

export const warmupBlogLikes = async () => {
  logger.info("Warming up blog likes set & count cache...");

  const rows = await db
    .select({ blogId: likes.blogId, userId: likes.userId, createdAt: likes.createdAt })
    .from(likes);

  if (rows.length === 0) {
    logger.info("No likes found, skipping warmup.");
    return;
  }

  // Group by blogId for count + per-blog set
  const byBlog = new Map<string, { userIds: string[] }>();
  // Group by userId for sorted set
  const byUser = new Map<string, { blogId: string; score: number }[]>();

  for (const row of rows) {
    const blogId = row.blogId;
    const userId = row.userId;
    const score = new Date(row.createdAt).getTime();

    if (!byBlog.has(blogId)) {
      byBlog.set(blogId, { userIds: [] });
    }
    byBlog.get(blogId)!.userIds.push(userId);

    if (!byUser.has(userId)) byUser.set(userId, []);
    byUser.get(userId)!.push({ blogId, score });
  }

  const pipeline = CacheService.pipeline();

  // Per-blog: count key + likes set
  for (const [blogId, { userIds }] of byBlog) {
    pipeline.set(blogLikesCountCK(blogId), userIds.length.toString());
    pipeline.sAdd(blogLikesCK(blogId), userIds);
  }

  // Per-user: sorted set + meta key
  for (const [userId, entries] of byUser) {
    const members = entries.map(({ blogId, score }) => ({ score, value: blogId }));
    pipeline.zAdd(userLikedCK(userId), members);
    pipeline.set(userLikedMetaCK(userId), "ok", { EX: USER_LIKED_BLOGS_TTL });
  }

  await pipeline.exec();

  logger.info(`Warmup complete: ${byBlog.size} blogs, ${byUser.size} users loaded into cache.`);

  return;
};
