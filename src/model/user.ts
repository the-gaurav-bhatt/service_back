import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { NextFunction } from "express";
export interface IUser {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role?: string;
  contact?: string;
  courses?: mongoose.Schema.Types.ObjectId[];
  reviews?: mongoose.Schema.Types.ObjectId[];
  cart?: mongoose.Schema.Types.ObjectId[];
  profilePicture?: string;
  bio?: string;
  comparePassword?(givenPassword: string): Promise<Boolean>;
}

const Role: String[] = ["student", "teacher"];
const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    required: true,
    type: String,
  },
  role: {
    type: String,
    default: "student",
  },
  contact: String,
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, refPath: "docModel" }],
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  profilePicture: String,
  bio: String,
});
// do something before saving the user

userSchema.pre("save", function (next: NextFunction) {
  if (!this.isModified("password")) next();
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      throw Error("Something went wrong while hashing password :" + err);
    }
    this.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = async function (
  givenPassword: string
): Promise<Boolean> {
  return await bcrypt.compare(givenPassword, this.password);
};

export default mongoose.model("User", userSchema);
