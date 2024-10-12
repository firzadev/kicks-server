import { Request, Response } from "express";
import { findUser } from "../../services/users/findUser";

export const handleFindUser = async (req: Request, res: Response) => {
  try {
    const { username, email } = req.body;
    console.log("THIS", username, email);

    const user = await findUser({ username, email });
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
