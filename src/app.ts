import express, { Application } from "express";
import userRouters from "./routers/userRouters";

const app: Application = express();

app.use(express.json());

app.use("/users", userRouters);

export default app;
