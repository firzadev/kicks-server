import cors from "cors";
import express, { Application } from "express";
import authRouters from "./routers/auth/auth.routers";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouters);

export default app;
