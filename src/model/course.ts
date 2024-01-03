import mongoose, { Document, InferSchemaType, Model } from "mongoose";
import user, { IUser } from "./user";
const objId = mongoose.Schema.Types.ObjectId;

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: {
    type: String,
    required: true,
  },
  duration: Number,
  language: [
    {
      type: String,
      default: "English",
    },
  ],
  price: { type: Number, required: true },
  requirements: [
    {
      type: String,
    },
  ],

  description: String,
  tutor: {
    type: objId,
    ref: "User",
    required: true,
  },
  category: String,
  createdAt: { type: Date, default: Date.now() },
  updatedAt: Date,
  thumbNail: String,
  content: [
    {
      type: objId,
      ref: "Chapter",
    },
  ],
  userIDs: [
    {
      type: objId,
      ref: "User",
    },
  ],
  review: [
    {
      type: objId,
      ref: "Review",
    },
  ],
  isFree: Boolean,
});
interface IDocs extends Icourse {
  _id: mongoose.Schema.Types.ObjectId;
}

export type Icourse = InferSchemaType<typeof courseSchema>;

courseSchema.post("save", async (doc: IDocs) => {
  const _id = doc.tutor;
  try {
    const Newuser = await user.findById(_id);
    Newuser.courses.push(doc._id);
    await Newuser.save();
  } catch (err) {
    console.log(err);
  }
});

export const Course: Model<Icourse> = mongoose.model<Icourse>(
  "Course",
  courseSchema
);
