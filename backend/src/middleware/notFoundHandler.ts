import { Request, Response, NextFunction } from "express";
import { AppError } from "./errorHandler";

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Pass a new AppError to the next middleware (error handler)
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
};
