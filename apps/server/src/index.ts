import { cors } from "@elysiajs/cors";
import { env } from "@metapress/env/server";
import { setupLogger, useElysiaLogger, useLogger } from "@metapress/logger";
import { Elysia } from "elysia";

import { apiHandler, rpcHandler } from "./handlers";
import { authController } from "./modules/auth";
import { warmupBlogLikes } from "./modules/cache/scripts/warmup-likes";
import { warmupUsernames } from "./modules/cache/scripts/warmup-usernames";
import { cronController } from "./modules/cron";

const logger = useLogger("server");
const PORT = 3000;

const orpcController = new Elysia()
  .all(
    "/reference*",
    async ({ request }) => {
      const { response } = await apiHandler.handle(request, {
        prefix: "/api/reference",
        context: { headers: request.headers },
      });
      return response ?? new Response("Not Found", { status: 404 });
    },
    { parse: "none" },
  )
  .all(
    "/*",
    async ({ request }) => {
      const { response } = await rpcHandler.handle(request, {
        prefix: "/api",
        context: { headers: request.headers },
      });
      return response ?? new Response("Not Found", { status: 404 });
    },
    { parse: "none" },
  );

const app = new Elysia({ prefix: "/api" })
  .use(useElysiaLogger())
  .onStart(async () => {
    await setupLogger();
    await warmupUsernames();
    await warmupBlogLikes();
  })
  .use(
    cors({
      origin: env.CORS_ORIGIN,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    }),
  )
  .use(authController)
  .use(orpcController)
  .use(cronController);

if (env.NODE_ENV !== "production") {
  app.listen(PORT, ({ hostname, port }) => {
    logger.info(`Server is running at ${hostname}:${port}`);
  });
}

export default app;
