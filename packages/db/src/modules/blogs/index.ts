import type { BlogContent } from "@metapress/contracts/blogs";
import { relations } from "drizzle-orm";
import {
  foreignKey,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

import {
  authorImage,
  authorName,
  authorUsername,
  createdAt,
  id,
  updatedAt,
} from "../../lib/common";
import { DEFAULTS } from "../../lib/defaults";
import { comments } from "../comments";
import { likes } from "../likes";
import { users } from "../users";

export const blogs = pgTable(
  "blogs",
  {
    id,
    title: varchar("title", { length: DEFAULTS.TITLE_LENGTH }).notNull(),
    content: jsonb("content").$type<BlogContent>().notNull(),
    cover: text("cover").notNull(),
    category: varchar("category", { length: DEFAULTS.CATEGORY_LENGTH }).notNull(),
    authorName,
    authorUsername,
    authorImage,
    likes: integer("likes").default(DEFAULTS.LIKES).notNull(),
    userId: varchar("user_id", { length: DEFAULTS.ID_LENGTH }).notNull(),
    createdAt,
    updatedAt,
  },
  (table) => [
    index("blogs_user_idx").on(table.userId),
    index("blogs_category_idx").on(table.category),
    index("blogs_created_at_idx").on(table.createdAt),
    foreignKey({ columns: [table.userId], foreignColumns: [users.id] })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ],
);

export const blogImages = pgTable(
  "blog_images",
  {
    id,
    blogId: varchar("blog_id", { length: DEFAULTS.ID_LENGTH }).notNull(),
    url: text("url").notNull(),
    publicId: varchar("public_id").notNull(),
    order: integer("order").notNull().default(DEFAULTS.ORDER),
    createdAt,
  },
  (table) => [
    uniqueIndex("blog_images_order_key").on(table.blogId, table.order),
    foreignKey({ columns: [table.blogId], foreignColumns: [blogs.id] })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ],
);

export const blogsRelations = relations(blogs, ({ one, many }) => ({
  likes: many(likes),
  comments: many(comments),
  users: one(users, {
    fields: [blogs.userId],
    references: [users.id],
  }),
  blogImages: many(blogImages),
}));

export const blogImagesRelations = relations(blogImages, ({ one }) => ({
  blog: one(blogs, { fields: [blogImages.blogId], references: [blogs.id] }),
}));
