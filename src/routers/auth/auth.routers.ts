import { Router } from "express";
import { registerController } from "../../controllers/auth/register.controller";
import { loginController } from "../../controllers/auth/login.controller";

const authRouters = Router();
authRouters.post("/register", registerController);
authRouters.post("/login", loginController);

export default authRouters;
