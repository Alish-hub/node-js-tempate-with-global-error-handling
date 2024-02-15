import { NextFunction, Request, Response } from "express";
import AppError from "../../utils/appError";

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("XXXXXX Inside error handler");
  if (err.isOperational) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  return res
    .status(500)
    .send({ error: "Internal server error,Please try again" });
};
// Unused
export const errorConverter = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let convertedError = err as any;
  console.log("YYYYY Inside error converter");

  if (!err.isOperational) {
    let message = err.message || "internal Server Error";
    let status = err.status || 500;
    convertedError = new AppError(status, message);
  }

  return errorHandler(convertedError, req, res, next);
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  console.log("ZZZZ INside not found");
  let message = "Route Not found";
  let status = 404;
  const err = new AppError(status, message);
  return errorHandler(err, req, res, next);
};
