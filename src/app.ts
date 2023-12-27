import express from "express";
import userRouter from "./routes/users.router.ts";
import cookieParser from "cookie-parser";
import cors from "cors";
import verifyAuthenticaton from "./middlewares/authMiddleware.ts";
const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1", userRouter);

app.use("/", verifyAuthenticaton, (req, res) => {
  res.status(200).send("<h1>You hit our base url </h1>");
});
export default app;
