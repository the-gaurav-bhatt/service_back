import express from "express";
import session from "express-session";
import userRouter from "./routes/users.router.ts";
import cookieParser from "cookie-parser";
import cors from "cors";
import verifyAuthenticaton from "./middlewares/authMiddleware.ts";
import passport from "passport";
import courseRouter from "./routes/courses.routes.ts";
import { handleErrors } from "./middlewares/errorMiddleware.ts";
const app = express();

app.use(
  cors({
    credentials: true,

    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://accounts.google.com",
      "https://a-pathshala-service-1.vercel.app",
    ],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.session());
app.use("/api/v1", userRouter);
app.use("/api/v1", courseRouter);
app.use("/api/v1", handleErrors);
app.use("/", (req, res) => {
  // console.log(user);
  res.status(200).send("<h1>You hit our base url </h1>");
});
export default app;
