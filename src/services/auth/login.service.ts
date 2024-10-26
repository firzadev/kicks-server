import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";
import { compare } from "bcrypt";
import { generateTokens } from "../../utils/jwt";

export const loginService = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const [user] = await db
      .select({ id: users.id, email: users.email, password: users.password })
      .from(users)
      .where(eq(users.email, email));

    if (!user) throw new Error("User not found!");

    const isPasswordValid = await compare(password, user.password as string);
    if (!isPasswordValid)
      throw new Error("Password incorrect or Invalid credentials!");

    const { accessToken } = generateTokens(user.id);

    return {
      user: { id: user.id, email: user.email },
      accessToken,
    };
  } catch (error) {
    console.log(error);
  }
};
