import { env } from "@metapress/env/server";
import { useLogger } from "@metapress/logger";
import { createClient } from "redis";

const logger = useLogger("server", "cache", "redis");

export const redis = createClient({
  url: env.REDIS_URL,
  socket: {
    connectTimeout: 10000,
    reconnectStrategy: (retries) => {
      if (retries > 10) {
        logger.error("Max retries reached");
        return new Error("Max retries reached");
      }
      return Math.min(retries * 50, 3000);
    },
  },
});

redis.on("error", (error) => {
  logger.error("Redis Error:", error);
});

await redis.connect();
