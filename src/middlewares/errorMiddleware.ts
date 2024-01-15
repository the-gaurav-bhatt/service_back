import { NextFunction, Request, Response } from "express";
export class NotFoundError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 404;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
export const GlobalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV === "development") {
    console.error(err); // Log error details in development
  }
  const statusCode = err instanceof NotFoundError ? err.statusCode : 500;
  const message =
    err instanceof NotFoundError ? err.message : "An Unexpected Error Occured";
  return res.status(statusCode).json({ message: message, success: false });
};
