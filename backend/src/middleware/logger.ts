import { Request, Response, NextFunction } from "express";

/**
 * Middleware for logging HTTP requests
 */
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();
  const { method, originalUrl, ip } = req;

  // Log request when it starts
  console.log(
    `[${new Date().toISOString()}] ${method} ${originalUrl} - IP: ${ip}`
  );

  // When response is finished, log the response time
  res.on("finish", () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    const statusColor =
      statusCode >= 500
        ? "\x1b[31m" // Red
        : statusCode >= 400
        ? "\x1b[33m" // Yellow
        : statusCode >= 300
        ? "\x1b[36m" // Cyan
        : "\x1b[32m"; // Green

    console.log(
      `[${new Date().toISOString()}] ${method} ${originalUrl} - ${statusColor}${statusCode}\x1b[0m - ${duration}ms`
    );
  });

  next();
};
