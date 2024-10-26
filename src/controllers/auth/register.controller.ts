import { Request, Response } from "express";
import { registerService } from "../../services/auth/register.service";
import { InsertUser } from "../../db/schema";

export const registerController = async (req: Request, res: Response) => {
  const { fullName, username, email, password }: InsertUser = req.body;
  try {
    const newUser = await registerService({
      fullName,
      username,
      email,
      password,
    });
    res.status(201).send("Success to create new user.");
  } catch (error) {
    console.log(error);
    res.status(400).send("Failed to create user.");
  }
};
