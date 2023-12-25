import express from "express";
import userRouter from "./routes/users.router.ts";
const app = express();

app.use(express.json());

app.use("/v1", userRouter);

// app.use("/", (req, res) => {
//   res.status(200).send("<h1>You hit our base url </h1>");
// });
export default app;
