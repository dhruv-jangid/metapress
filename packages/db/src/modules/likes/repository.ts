import { eq, sql } from "drizzle-orm";

import { likes } from ".";
import { db } from "../../index";
import { blogs } from "../blogs";

export abstract class LikeRepository {
  static getAll = async () => {
    const rows = await db.select().from(likes);

    return rows;
  };

  static createMany = async (
    data: {
      id: string;
      likes: number;
    }[],
  ) => {
    await db.transaction(async (tx) => {
      for (const blog of data) {
        await tx
          .update(blogs)
          .set({
            likes: blog.likes,
            updatedAt: sql`CURRENT_TIMESTAMP`,
          })
          .where(eq(blogs.id, blog.id));
      }
    });
  };
}
