import { UserRepository } from "@metapress/db/users";
import { useLogger } from "@metapress/logger";

import { usernameBFCK } from "../keys";
import { CacheService } from "../service";

const logger = useLogger("server", "cache", "warmup");

export const warmupUsernames = async () => {
  logger.info("Warming up username set cache...");

  const usernames = await UserRepository.getAllUsernames();

  logger.info("Cached usernames");

  await CacheService.sAdd(usernameBFCK, ...usernames);
};
