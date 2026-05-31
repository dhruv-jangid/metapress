import { cron, Patterns } from "@elysia/cron";
import { db } from "@metapress/db";
import { blogs } from "@metapress/db/schemas";
import { useLogger } from "@metapress/logger";
import { eq, sql } from "drizzle-orm";
import { Elysia } from "elysia";

import { redis } from "../cache/redis";

const BATCH_SIZE = 100;
const logger = useLogger("cron", "sync-likes");

export const syncLikesCron = new Elysia().use(
  cron({
    name: "sync-likes",
    pattern: Patterns.EVERY_MINUTE,
    run: async () => {
      logger.info("[CRON] Starting likes sync from cache to database");

      const cacheKeys = await redis.keys("blog:*:likes:count");

      if (cacheKeys.length === 0) {
        logger.info("[CRON] No cached likes found");
        return;
      }

      logger.info(`[CRON] Found ${cacheKeys.length} blogs with cached likes`);

      let totalSynced = 0;
      const errors: string[] = [];

      // Process in batches to avoid memory issues
      for (let i = 0; i < cacheKeys.length; i += BATCH_SIZE) {
        const batchKeys = cacheKeys.slice(i, i + BATCH_SIZE);

        try {
          const pipeline = redis.multi();
          batchKeys.forEach((key) => pipeline.get(key));
          const cachedValues = (await pipeline.execAsPipeline()) as unknown as string[];

          const updates: Array<{ id: string; likes: number }> = [];

          batchKeys.forEach((key, index) => {
            const blogId = key.replace("blog:", "").replace(":likes:count", "");
            const cachedLikes = cachedValues?.[index];

            if (cachedLikes !== null && cachedLikes !== undefined) {
              const likesCount = parseInt(cachedLikes, 10);

              if (!isNaN(likesCount) && likesCount >= 0) {
                updates.push({ id: blogId, likes: likesCount });
              } else {
                console.warn(`[CRON] Invalid likes count for ${blogId}: ${cachedLikes}`);
              }
            }
          });

          if (updates.length === 0) {
            continue;
          }

          await db.transaction(async (tx) => {
            for (const update of updates) {
              await tx
                .update(blogs)
                .set({
                  likes: update.likes,
                  updatedAt: sql`CURRENT_TIMESTAMP`,
                })
                .where(eq(blogs.id, update.id));
            }
          });

          totalSynced += updates.length;
          logger.info(
            `[CRON] Batch synced ${updates.length} blogs (${i + 1}-${Math.min(
              i + BATCH_SIZE,
              cacheKeys.length,
            )} of ${cacheKeys.length})`,
          );
        } catch (error) {
          const errorMsg = `Batch ${i / BATCH_SIZE + 1} failed: ${
            error instanceof Error ? error.message : "Unknown error"
          }`;
          logger.error(`[CRON] ${errorMsg}`);
          errors.push(errorMsg);
        }
      }

      logger.info(`[CRON] Completed likes sync. Synced: ${totalSynced}, Errors: ${errors.length}`);
    },
  }),
) as unknown as Elysia;
