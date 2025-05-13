import { Request, Response, NextFunction } from "express";
import { AppError } from "./errorHandler";

// Error handling middleware
export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Default values
  let statusCode = 500;
  let message = "Something went wrong";
  let stack = process.env.NODE_ENV === "production" ? undefined : err.stack;

  // Check if this is our custom AppError
  if ("statusCode" in err) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Send response
  res.status(statusCode).json({
    status: statusCode >= 400 && statusCode < 500 ? "fail" : "error",
    message,
    stack,
  });
};
