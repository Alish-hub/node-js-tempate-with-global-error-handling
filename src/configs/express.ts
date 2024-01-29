import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import {
  errorConverter,
  errorHandler,
  notFound,
} from "../api/middlewares/errorHandler.middleware";
import { indexRouter } from "../api/routes/index.route";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(morgan("combined"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", indexRouter);
app.use("*", notFound);
app.use("*", errorHandler);
app.use("*", errorConverter);

export default app;
