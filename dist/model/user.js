import mongoose from "mongoose";
import bcrypt from "bcrypt";
const Role = ["student", "teacher"];
const userSchema = new mongoose.Schema({
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
    address: String,
    role: {
        type: String,
        default: "student",
    },
    googleId: String,
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
userSchema.pre("save", function (next) {
    if (!this.isModified("password"))
        next();
    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) {
            throw Error("Something went wrong while hashing password :" + err);
        }
        this.password = hash;
        next();
    });
});
userSchema.methods.comparePassword = async function (givenPassword) {
    return await bcrypt.compare(givenPassword, this.password);
};
export default mongoose.model("User", userSchema);
//# sourceMappingURL=user.js.map