import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headers = req.headers["authorization"];
  const token = headers?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token access required!" });

  const payload = verifyAccessToken(token);
  if (!payload)
    return res.status(403).json({ error: "Token invalid or expired!" });

  req.user = { id: payload.userId };
  next();
};
