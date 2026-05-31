import { relations } from "drizzle-orm";
import { foreignKey, index, pgTable, text, varchar } from "drizzle-orm/pg-core";

import { authorImage, authorName, authorUsername, createdAt, id, updatedAt } from "../lib/common";
import { DEFAULTS } from "../lib/defaults";
import { users } from "./auth";
import { blogs } from "./blogs";

export const comments = pgTable(
  "comments",
  {
    id,
    content: text("content").notNull(),
    blogId: varchar("blog_id", { length: DEFAULTS.ID_LENGTH }).notNull(),
    userId: varchar("user_id", { length: DEFAULTS.ID_LENGTH }).notNull(),
    authorName,
    authorUsername,
    authorImage,
    createdAt,
    updatedAt,
  },
  (table) => [
    index("comments_user_idx").on(table.userId),
    index("comments_blog_idx").on(table.blogId),
    index("comments_created_at_idx").on(table.createdAt),
    foreignKey({ columns: [table.userId], foreignColumns: [users.id] })
      .onUpdate("cascade")
      .onDelete("cascade"),
    foreignKey({ columns: [table.blogId], foreignColumns: [blogs.id] })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ],
);

export const commentsRelations = relations(comments, ({ one }) => ({
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
  blog: one(blogs, {
    fields: [comments.blogId],
    references: [blogs.id],
  }),
}));
