import { db } from "../../db";
import { InsertUser, users } from "../../db/schema";
import { hash } from "bcrypt";

export const registerService = async ({
  username,
  fullName,
  email,
  password,
}: Omit<InsertUser, "id" | "createdAt" | "updatedAt">) => {
  try {
    const saltRounds = 10;
    const hashedPassword = (await hash(
      password as string,
      saltRounds
    )) as string;

    const newUser = await db
      .insert(users)
      .values({
        email: email,
        fullName: fullName,
        username: username,
        password: hashedPassword,
      });
    return newUser;
  } catch (error) {
    console.log(error);
  }
};
