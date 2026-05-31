import { sql } from "drizzle-orm";
import { text, timestamp, varchar, type PgTimestampConfig } from "drizzle-orm/pg-core";

import { DEFAULTS } from "./defaults";
import { generateSnowflake } from "./snowflake";

export const id = varchar("id", { length: DEFAULTS.ID_LENGTH })
  .primaryKey()
  .$defaultFn(() => generateSnowflake())
  .notNull();

export const timestampConfig: PgTimestampConfig = {
  precision: 3,
  mode: "string",
  withTimezone: true,
};

export const createdAt = timestamp("created_at", timestampConfig)
  .$type<string>()
  .defaultNow()
  .notNull();

export const updatedAt = timestamp("updated_at", timestampConfig)
  .$type<string>()
  .defaultNow()
  .$onUpdate(() => sql`CURRENT_TIMESTAMP`)
  .notNull();

export const authorName = varchar("author_name", { length: DEFAULTS.NAME_LENGTH }).notNull();

export const authorUsername = varchar("author_username", {
  length: DEFAULTS.USERNAME_LENGTH,
}).notNull();

export const authorImage = text("author_image");
