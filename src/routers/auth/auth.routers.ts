import { Router } from "express";
import { registerController } from "../../controllers/auth/register.controller";

const authRouters = Router();
authRouters.post("/register", registerController);

export default authRouters;
