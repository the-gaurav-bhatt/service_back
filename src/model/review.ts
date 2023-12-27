import mongoose, { Model, Schema } from "mongoose";
// this is old method.use inferSchemaType can be used instead
export interface IReview {
  text: String;
  rating: Number;
  user: mongoose.Schema.Types.ObjectId;
  course: mongoose.Schema.Types.ObjectId;
}
const reviewSchema: Schema<IReview> = new mongoose.Schema<IReview>({
  text: { type: String, required: true },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
});
export default mongoose.model<IReview>("Review", reviewSchema);
