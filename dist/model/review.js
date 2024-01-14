import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
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
export default mongoose.model("Review", reviewSchema);
//# sourceMappingURL=review.js.map