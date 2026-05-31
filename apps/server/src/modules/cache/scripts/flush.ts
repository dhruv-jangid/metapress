import { setupLogger, useLogger } from "@metapress/logger";

import { CacheService } from "../service";

await setupLogger();

const logger = useLogger("server", "cache", "warmup");

export const flushAllCache = async () => {
  logger.info("Flushing cache...");

  await CacheService.flushAll();

  return;
};

await flushAllCache().catch((error) => {
  logger.error("Error purging cache:", error);
  process.exit(1);
});
