import mongoose, { Document, InferSchemaType, Model } from "mongoose";
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
    ref: "Teacher",
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

export type Icourse = InferSchemaType<typeof courseSchema>;

export const Course: Model<Icourse> = mongoose.model<Icourse>(
  "Course",
  courseSchema
);
