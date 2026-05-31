import { db } from "@metapress/db";
import { users } from "@metapress/db/schemas";
import { eq } from "drizzle-orm";

export abstract class UserRepository {
  static findByUsername = async (username: string) => {
    const [row = null] = await db
      .select({
        id: users.id,
        name: users.name,
        username: users.username,
        image: users.image,
        role: users.role,
      })
      .from(users)
      .where(eq(users.username, username))
      .limit(1);

    return row;
  };
}
