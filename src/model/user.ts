import mongoose from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
  contact?: string;
  courses?: mongoose.Schema.Types.ObjectId[];
  reviews?: mongoose.Schema.Types.ObjectId[];
  cart?: mongoose.Schema.Types.ObjectId[];
  profilePicture?: string;
  bio?: string;
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
export default mongoose.model("User", userSchema);
