import { Router } from "express";
import { registration } from "../controllers/user.controller";

const router = Router();

router.post("/register", registration);

export { router as userRouter };
