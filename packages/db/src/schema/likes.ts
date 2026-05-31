import { relations } from "drizzle-orm";
import { foreignKey, index, pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";

import { createdAt, updatedAt } from "../lib/common";
import { DEFAULTS } from "../lib/defaults";
import { users } from "./auth";
import { blogs } from "./blogs";

export const likes = pgTable(
  "likes",
  {
    userId: varchar("user_id", { length: DEFAULTS.ID_LENGTH }).notNull(),
    blogId: varchar("blog_id", { length: DEFAULTS.ID_LENGTH }).notNull(),
    createdAt,
    updatedAt,
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.blogId] }),
    index("likes_user_idx").on(table.userId),
    index("likes_blog_idx").on(table.blogId),
    foreignKey({ columns: [table.userId], foreignColumns: [users.id] })
      .onUpdate("cascade")
      .onDelete("cascade"),
    foreignKey({ columns: [table.blogId], foreignColumns: [blogs.id] })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ],
);

export const likesRelations = relations(likes, ({ one }) => ({
  user: one(users, {
    fields: [likes.userId],
    references: [users.id],
  }),
  blog: one(blogs, {
    fields: [likes.blogId],
    references: [blogs.id],
  }),
}));
