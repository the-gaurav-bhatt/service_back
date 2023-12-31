import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}
const verifyAuthentication = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Not Authorized, Token Not found", success: false });
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    console.log("Decoded Thing is given below");
    console.log(decoded);
    if (!decoded) {
      return res.status(401).json({
        message: "Not Authorized, Failed To decode the Token",
        success: false,
      });
    }

    // Store the decoded payload in the request object for future use
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Not Authorized, Invalid Token",
      success: false,
      err: error,
    });
  }
};

export default verifyAuthentication;
