import { boolean, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

import { createdAt, id, updatedAt } from "../../lib/common";
import { DEFAULTS } from "../../lib/defaults";

export const users = pgTable("users", {
  id,
  name: varchar("name", { length: DEFAULTS.NAME_LENGTH }).default(DEFAULTS.DEFAULT_NAME).notNull(),
  displayUsername: varchar("display_username", { length: DEFAULTS.NAME_LENGTH }),
  username: varchar("username", { length: DEFAULTS.USERNAME_LENGTH }).unique().notNull(),
  email: varchar("email", { length: DEFAULTS.EMAIL_LENGTH }).notNull(),
  emailVerified: boolean("email_verified").default(DEFAULTS.EMAIL_VERIFIED).notNull(),
  image: text("image"),
  createdAt,
  updatedAt,
  role: varchar("role", { length: DEFAULTS.ROLE_LENGTH }).default(DEFAULTS.DEFAULT_ROLE).notNull(),
  banned: boolean("banned").default(DEFAULTS.BANNED).notNull(),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
});
