import { eq } from "drizzle-orm";

import { db } from "../../index";
import { users } from "../users";

export abstract class UserRepository {
  static getAllUsernames = async () => {
    const usernames = await db
      .select({ username: users.username })
      .from(users)
      .then((rows) => rows.map((r) => r.username));

    return usernames;
  };

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
