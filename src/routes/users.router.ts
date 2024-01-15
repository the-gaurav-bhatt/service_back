import express, { Request, Response } from "express";
import passport from "passport";
import {
  registerUser,
  authenticateUser,
  giveProfileInfo,
  updateProfileInfo,
  logoutUser,
  googleRedirect,
} from "./users.controller.js";
import verifyAuthenticaton from "../middlewares/authMiddleware.js";
import setUpAuth from "../config/googleAuth.js";
const userRouter = express.Router();
setUpAuth();
userRouter.get("/user/profile", verifyAuthenticaton, giveProfileInfo);
userRouter.post("/user/updateUser", verifyAuthenticaton, updateProfileInfo);
userRouter.post("/signup", registerUser);
userRouter.post("/login", authenticateUser);
userRouter.get("/logout", logoutUser);
userRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
userRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureMessage: "Failed to log in with google",
    failureRedirect: "/login",
  }),
  googleRedirect
);
export default userRouter;
