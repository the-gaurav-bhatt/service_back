import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import mongoose from "mongoose";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
export const generateToken = (
  res: Response,
  id: mongoose.Schema.Types.ObjectId
) => {
  const token = jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "1hr",
  });
  console.log(token);
  res.cookie("jwt", token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    secure: true,
    domain: ".onrender.com",
    maxAge: 60 * 60 * 1000,
  });
};
export const clearToken = (res: Response) => {
  res.cookie("jwt", "", {
    expires: new Date(0),
  });
};
