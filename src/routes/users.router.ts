import express, { Request, Response } from "express";
import { IUser } from "../model/user.ts";
import userModel from "../model/user.ts";
const userRouter = express.Router();

userRouter.post("/user", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.send(400).send("Something is missining in the body");
  } else {
    try {
      const user: IUser | null = await userModel.findOneAndUpdate(
        { email },
        {
          name,
          email,
          password,
        },
        { new: true, upsert: true }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send("Something Went Wrong " + err);
    }
    res.status(201).send("User Successfully Added");
  }
});

export default userRouter;
