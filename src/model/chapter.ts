import { NextFunction } from "express";
import mongoose, { InferSchemaType } from "mongoose";
import { Course } from "./course.js";
// export interface IChapter extends Document {
//   chapterName: String;
//   chapterTitle: String;
//   pdfProfileTitles?: String[];
//   videoTitles: String[];
//   pdfLinks?: String[];
//   course: mongoose.Schema.Types.ObjectId;
// }
const chapterSchema = new mongoose.Schema({
  chapterName: String,
  chapterTitle: String,
  pdfProfileTitles: [String],
  videoTitles: [
    {
      name: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  pdfLinks: [
    {
      name: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
});
chapterSchema.post("save", async (doc) => {
  const _id = doc.course;
  try {
    const course = await Course.findById({ _id });
    course.content.push(doc._id);
    await course.save();
  } catch (err) {
    console.log(err);
  }
});
export type IChapter = InferSchemaType<typeof chapterSchema>;
export default mongoose.model<IChapter>("Chapter", chapterSchema);
