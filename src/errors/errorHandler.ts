import { Request, Response, NextFunction } from "express";
import { ApiError } from "./ApiError";

export const errorHandler = (
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  res.status(500).json({ message: "Internal server error" });
};
