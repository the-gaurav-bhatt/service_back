import express from "express";

const courseRouter = express.Router();

courseRouter.use("/course", (req, res) => {
  res.status(200).send("<h1> This is for Course api endpoint</h1>");
});
