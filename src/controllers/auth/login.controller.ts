import { Request, Response } from "express";
import { loginService } from "../../services/auth/login.service";

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await loginService({ email, password });
    console.log("OII", user);

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).send("LOGIN ERROR");
  }
};
