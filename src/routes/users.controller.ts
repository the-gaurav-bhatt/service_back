import { Request, Response } from "express";
import userModel from "../model/user";
import { generateToken } from "../utils/auth";
export const registerUser = async (req: Request, res: Response) => {
  console.log("Singup url hit success");
  const { name, email, password } = req.body;
  console.log(name, email, password);
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Some property is missing " });
    }
    const user = await userModel.findOne({ email: email });
    console.log(user);
    if (user) {
      return res.status(400).json({ message: "User Already Exist" });
    } else {
      const user = await userModel.create({ name, email, password });
      generateToken(res, user._id);
      const userProfile = {
        name: user.name,
        _id: user._id,
        img: user.profilePicture,
      };
      console.log(user);
      return res.status(201).json({
        message: "User Successfully Created",
        success: true,
        userProfile,
      });
    }
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ message: "Something went wrong while Regestering User" });
  }
};

export const authenticateUser = async (req: Request, res: Response) => {
  console.log("Login ROute hit");
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email });
  if (user && (await user.comparePassword(password))) {
    generateToken(res, user._id);

    const _id = user?._id.toString();
    const userProfile = { name: user.name, _id, img: user.profilePicture };
    console.log(userProfile);
    return res.status(200).json({
      message: "Authentication Success",
      success: true,
      userProfile,
    });
  }
  return res.status(401).json({
    message: "Invalid Email/Password",
  });
};

const logOut = async (req: Request, res: Response) => {};
