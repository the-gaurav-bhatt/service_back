import express, { Request, Response } from "express";
import passport from "passport";
import { registerUser, authenticateUser } from "./users.controller.ts";
import setUpAuth from "../config/googleAuth.ts";
import { generateToken } from "../utils/auth.ts";
const userRouter = express.Router();
setUpAuth();
userRouter.post("/signup", registerUser);
userRouter.post("/login", authenticateUser);
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

  // this will reach only if the login
  (req, res) => {
    const user = (req.session as any).passport.user;
    console.log(user);
    generateToken(res, user.id);
    res.redirect("http://localhost:3000/");
  }
);
export default userRouter;
