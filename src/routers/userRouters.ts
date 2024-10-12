import { Router } from "express";
import { handleCreateUser } from "../controllers/users/handleCreateUser";
import { handleFindUser } from "../controllers/users/handleFindUser";

const userRouters = Router();

userRouters.get("/", handleFindUser);
userRouters.post("/", handleCreateUser);

export default userRouters;
