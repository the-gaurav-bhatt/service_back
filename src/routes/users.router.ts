import express, { Request, Response } from "express";
import { IUser } from "../model/user.ts";
import { registerUser, authenticateUser } from "./users.controller.ts";
import verifyAuthentication from "../middlewares/authMiddleware.ts";
const userRouter = express.Router();

userRouter.post("/signup", registerUser);
userRouter.post("/login", verifyAuthentication, authenticateUser);

export default userRouter;
