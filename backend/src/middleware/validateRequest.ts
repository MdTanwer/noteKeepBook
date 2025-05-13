import { Request, Response, NextFunction } from "express";
import { AppError } from "./errorHandler";

interface ValidationSchema {
  [key: string]: {
    required?: boolean;
    type?: string;
    min?: number;
    max?: number;
    enum?: string[];
    pattern?: RegExp;
    custom?: (value: any) => boolean | string;
  };
}

/**
 * Middleware to validate request body against a schema
 * @param schema - Validation schema object
 * @returns Middleware function
 */
export const validateBody = (schema: ValidationSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: string[] = [];

    for (const [field, rules] of Object.entries(schema)) {
      const value = req.body[field];

      // Check required
      if (
        rules.required &&
        (value === undefined || value === null || value === "")
      ) {
        errors.push(`${field} is required`);
        continue;
      }

      // Skip further validation if field is not provided and not required
      if ((value === undefined || value === null) && !rules.required) {
        continue;
      }

      // Check type
      if (rules.type && value !== undefined) {
        const actualType = Array.isArray(value) ? "array" : typeof value;
        if (actualType !== rules.type) {
          errors.push(`${field} must be of type ${rules.type}`);
        }
      }

      // Check min/max for numbers
      if (rules.type === "number" && typeof value === "number") {
        if (rules.min !== undefined && value < rules.min) {
          errors.push(`${field} must be at least ${rules.min}`);
        }
        if (rules.max !== undefined && value > rules.max) {
          errors.push(`${field} must be at most ${rules.max}`);
        }
      }

      // Check min/max length for strings
      if (rules.type === "string" && typeof value === "string") {
        if (rules.min !== undefined && value.length < rules.min) {
          errors.push(`${field} must be at least ${rules.min} characters long`);
        }
        if (rules.max !== undefined && value.length > rules.max) {
          errors.push(`${field} must be at most ${rules.max} characters long`);
        }
      }

      // Check enum values
      if (rules.enum && rules.enum.indexOf(value) === -1) {
        errors.push(`${field} must be one of: ${rules.enum.join(", ")}`);
      }

      // Check pattern
      if (
        rules.pattern &&
        typeof value === "string" &&
        !rules.pattern.test(value)
      ) {
        errors.push(`${field} has an invalid format`);
      }

      // Custom validation
      if (rules.custom && typeof rules.custom === "function") {
        const result = rules.custom(value);
        if (result !== true && typeof result === "string") {
          errors.push(result);
        } else if (result === false) {
          errors.push(`${field} is invalid`);
        }
      }
    }

    if (errors.length > 0) {
      return next(new AppError(errors.join(". "), 400));
    }

    next();
  };
};
