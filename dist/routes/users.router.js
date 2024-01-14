import express from "express";
import passport from "passport";
import { registerUser, authenticateUser, giveProfileInfo, updateProfileInfo, logoutUser, } from "./users.controller.js";
import verifyAuthenticaton from "../middlewares/authMiddleware.js";
import setUpAuth from "../config/googleAuth.js";
import { generateToken } from "../utils/auth.js";
const userRouter = express.Router();
setUpAuth();
userRouter.get("/user/profile", verifyAuthenticaton, giveProfileInfo);
userRouter.post("/user/updateUser", verifyAuthenticaton, updateProfileInfo);
userRouter.post("/signup", registerUser);
userRouter.post("/login", authenticateUser);
userRouter.get("/logout", logoutUser);
userRouter.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
userRouter.get("/auth/google/callback", passport.authenticate("google", {
    failureMessage: "Failed to log in with google",
    failureRedirect: "/login",
}), 
// this will reach only if the login
(req, res) => {
    const user = req.session.passport.user;
    console.log(user);
    generateToken(res, user.id);
    /*
      user.img
      user.name


    */
    res.redirect(`http://localhost:3000/login?name=${user.name}&img=${user.img}&_id=${user.id}`);
});
export default userRouter;
//# sourceMappingURL=users.router.js.map