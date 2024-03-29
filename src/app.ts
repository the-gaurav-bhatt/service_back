import express from "express";
import session from "express-session";
import userRouter from "./routes/users.router.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import courseRouter from "./routes/courses.routes.js";
import { GlobalErrorHandler } from "./middlewares/errorMiddleware.js";
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
app.use("/api/v1", GlobalErrorHandler);
app.use("/", (req, res) => {
  res.status(200).send("<h1>You hit our base url </h1>");
});
export default app;
