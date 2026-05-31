import { db } from "@metapress/db";
import { users } from "@metapress/db/schemas";
import { useLogger } from "@metapress/logger";

import { usernameBFCK } from "../keys";
import { CacheService } from "../service";

const logger = useLogger("server", "cache", "warmup");

export const warmupUsernames = async () => {
  logger.info("Warming up username set cache...");

  const usernames = await db
    .select({ username: users.username })
    .from(users)
    .then((rows) => rows.map((r) => r.username));

  logger.info("Cached usernames");

  await CacheService.sAdd(usernameBFCK, ...usernames);
};
