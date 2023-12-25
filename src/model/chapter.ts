import mongoose from "mongoose";
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
export default mongoose.model("Chapter", chapterSchema);
