import { Elysia } from "elysia";

import { syncLikesCron } from "./sync-likes";

export const cronController = new Elysia().use(syncLikesCron);
