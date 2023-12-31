import mongoose, { InferSchemaType } from "mongoose";
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
  videoTitles: [String],
  pdfLinks: [String],
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
});
export type IChapter = InferSchemaType<typeof chapterSchema>;
export default mongoose.model<IChapter>("Chapter", chapterSchema);
