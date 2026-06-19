import { env } from "@metapress/env/server";
import { useDrizzleLogger } from "@metapress/logger";
import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "./modules/schema";

export const db = drizzle(env.DATABASE_URL, { schema, logger: useDrizzleLogger() });
