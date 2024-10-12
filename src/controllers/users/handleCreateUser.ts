import { Request, Response } from "express";
import { InsertUser } from "../../db/schema";
import { createUser } from "../../services/users/createUser";

export const handleCreateUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await createUser({ username, email, password });
    res.status(201).send("User created!");
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "There was an error creating the user" });
  }
};
