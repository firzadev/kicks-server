import { db } from "../../db";
import { InsertUser, users } from "../../db/schema";

export const createUser = async ({ username, password, email }: InsertUser) => {
  try {
    const newUser = await db
      .insert(users)
      .values({ username, email, password })
      .returning();
    return newUser;
  } catch (error) {
    console.log(error);
  }
};
