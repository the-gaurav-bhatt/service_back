import { NextFunction, Request, Response } from "express";

export const handleErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  return res.status(500).json({ message: err.message });
};
