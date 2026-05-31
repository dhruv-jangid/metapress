import { router } from "@metapress/api/router";
import { implement } from "@orpc/server";

import { authMiddleware } from "./middleware";

const os = implement(router).$context<{ headers: Headers }>();

export const publicProcedure = os;

export const protectedProcedure = os.use(authMiddleware);
