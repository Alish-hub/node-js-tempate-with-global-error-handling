import { Router } from "express";
import { userRouter } from "./user.route";

export const indexRouter = Router();

indexRouter.use("/user", userRouter);
