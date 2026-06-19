import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  index,
  varchar,
  uniqueIndex,
  foreignKey,
} from "drizzle-orm/pg-core";

import { createdAt, id, timestampConfig, updatedAt } from "../../lib/common";
import { DEFAULTS } from "../../lib/defaults";
import { blogs } from "../blogs";
import { comments } from "../comments";
import { likes } from "../likes";
import { users } from "../users";

export const sessions = pgTable(
  "sessions",
  {
    id,
    userId: varchar("user_id", { length: DEFAULTS.ID_LENGTH }).notNull(),
    token: varchar("token", { length: DEFAULTS.TOKEN_LENGTH }).notNull(),
    expiresAt: timestamp("expires_at", timestampConfig).notNull(),
    createdAt,
    updatedAt,
    ipAddress: varchar("ip_address", { length: DEFAULTS.IP_ADDRESS_LENGTH }),
    userAgent: varchar("user_agent", { length: DEFAULTS.USER_AGENT_LENGTH }),
    impersonatedBy: text("impersonated_by"),
  },
  (table) => [
    uniqueIndex("sessions_token_key").on(table.token),
    index("sessions_user_idx").on(table.userId),
    foreignKey({ columns: [table.userId], foreignColumns: [users.id] })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ],
);

export const accounts = pgTable(
  "accounts",
  {
    id,
    accountId: varchar("account_id", { length: DEFAULTS.ACCOUNT_ID_LENGTH }).notNull(),
    providerId: varchar("provider_id", {
      length: DEFAULTS.PROVIDER_ID_LENGTH,
    }).notNull(),
    userId: varchar("user_id", { length: DEFAULTS.ID_LENGTH }).notNull(),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at", timestampConfig),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at", timestampConfig),
    scope: varchar("scope", { length: DEFAULTS.SCOPE_LENGTH }),
    password: varchar("password", { length: DEFAULTS.PASSWORD_LENGTH }),
    createdAt,
    updatedAt,
  },
  (table) => [
    uniqueIndex("accounts_provider_key").on(table.providerId, table.accountId),
    index("accounts_user_idx").on(table.userId),
    foreignKey({ columns: [table.userId], foreignColumns: [users.id] })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ],
);

export const verifications = pgTable("verifications", {
  id,
  identifier: varchar("identifier", { length: DEFAULTS.IDENTIFIER_LENGTH }).notNull(),
  value: varchar("value", { length: DEFAULTS.VALUE_LENGTH }).notNull(),
  expiresAt: timestamp("expires_at", timestampConfig).notNull(),
  createdAt,
  updatedAt,
});

export const usersRelations = relations(users, ({ many }) => ({
  blogs: many(blogs),
  likes: many(likes),
  comments: many(comments),
  accounts: many(accounts),
  sessions: many(sessions),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));
