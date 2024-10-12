import { eq, or } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";

export const findUser = async ({
  username,
  email,
}: {
  username?: string;
  email?: string;
}) => {
  try {
    const conditions = [];
    if (username) conditions.push(eq(users.username, username));

    if (email) conditions.push(eq(users.email, email));

    if (conditions.length === 0)
      throw new Error("Should input either email or username");

    const user = await db
      .select({ username: users.username, email: users.email })
      .from(users)
      .where(conditions.length > 1 ? or(...conditions) : conditions[0]);

    return user;
  } catch (error) {
    console.log(error);
  }
};
