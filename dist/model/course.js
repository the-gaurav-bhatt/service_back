import mongoose from "mongoose";
import user from "./user.js";
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
    category: { type: String, required: true },
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
courseSchema.post("save", async (doc) => {
    const _id = doc.tutor;
    try {
        const Newuser = await user.findById(_id);
        Newuser.courses.push(doc._id);
        await Newuser.save();
    }
    catch (err) {
        console.log(err);
    }
});
export const Course = mongoose.model("Course", courseSchema);
//# sourceMappingURL=course.js.map