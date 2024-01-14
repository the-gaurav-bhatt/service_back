import { Course } from "../model/course.js";
import { getObjectUrl, putObjectToBucket } from "../config/aws.js";
import express from "express";
import verifyAuthentication from "../middlewares/authMiddleware.js";
import Chapter from "../model/chapter.js";
import user from "../model/user.js";
const courseRouter = express.Router();
// courseRouter.use("/course", (req, res) => {
//   res.status(200).send("<h1> This is for Course api endpoint</h1>");
// });
courseRouter.post("/uploadPhoto", async (req, res) => {
    const data = req.body;
    console.log(data);
    try {
        const url = await putObjectToBucket(data.fileName, data.contentType);
        return res.status(200).json({ success: true, url });
    }
    catch (err) {
        console.log(err);
        return res.status(404).json({ success: false });
    }
});
courseRouter.post("/getPhoto", async (req, res) => {
    const data = req.body;
    console.log(data);
    try {
        const url = await getObjectUrl(data.key);
        console.log("The url is " + url);
        return res.status(200).json({ success: true, url });
    }
    catch (err) {
        console.log(err);
        return res.status(404).json({ success: false });
    }
});
courseRouter.post("/hi", verifyAuthentication, async (req, res) => {
    console.log("Hitting Create Course Route");
    const data = req.body.newCourse;
    console.log(data);
    const _id = req.user.id;
    try {
        const course = new Course({
            title: data.title,
            price: data.price,
            thumbNail: data.thumbNail,
            requirements: data.requirements,
            subtitle: data.subtitle,
            language: data.language,
            description: data.description,
            tutor: _id,
        });
        const respon = await course.save();
        console.log("Chekcing for course object after saving it in db");
        console.log(respon);
        return res.status(200).json({
            message: "Success Course Upload",
            success: true,
            _id: respon._id.toString(),
        });
    }
    catch (err) {
        console.log(err);
    }
    console.log(data);
});
courseRouter.post("/editCourse", verifyAuthentication, async (req, res) => {
    console.log("Hitting Update Course Route");
    const data = req.body.newCourse;
    const _id = req.query.courseId;
    console.log(_id);
    console.log(data);
    try {
        // Find the course and update it
        const course = await Course.findByIdAndUpdate(_id, {
            title: data.title,
            price: data.price,
            thumbNail: data.thumbNail,
            requirements: data.requirements,
            discount: data.discount,
            subtitle: data.subtitle,
            language: data.language,
            description: data.description,
        });
        console.log("Checking for course object after updating it in db");
        console.log(course);
        return res.status(200).json({
            message: "Success Course Update",
            success: true,
            _id: course._id.toString(),
        });
    }
    catch (err) {
        console.log(err);
    }
});
courseRouter.delete("/deleteCourse/:courseId", async (req, res) => {
    const { courseId } = req.params;
    console.log(courseId);
    try {
        const del = await Course.findByIdAndDelete({ _id: courseId });
        console.log(del);
        return res.status(200).json({ success: true });
    }
    catch (err) {
        console.log(err);
        return res.status(404).json(null);
    }
});
courseRouter.post("/addSection", async (req, res) => {
    const data = req.body;
    // const id = data.course;
    // const objId = new mongoose.Types.ObjectId(id);
    // data.course = objId;
    console.log(data);
    try {
        const chapter = new Chapter(data);
        const result = await chapter.save();
        console.log(result);
        return res
            .status(200)
            .json({ message: "Success hit addSection Url", success: true });
    }
    catch (err) {
        console.log(err);
        return res
            .status(401)
            .json({ message: "Something went wrong while updating course" });
    }
});
courseRouter.get("/getCourses", verifyAuthentication, async (req, res) => {
    console.log("Get Courses Url Hit" + req.user.id);
    try {
        const us = await user.findById(req.user.id).populate("courses").exec();
        console.log(us);
        const course = await Course.find({ tutor: req.user.id });
        return res.status(200).json(course);
    }
    catch (err) {
        return res.status(404).json({ success: false });
    }
});
courseRouter.get("/popularCourses", async (req, res) => {
    try {
        const course = await Course.find({}).sort("-price").limit(10).exec();
        return res.status(200).json(course);
    }
    catch (err) {
        console.log(err);
        return res.status(404).json({ success: false });
    }
});
courseRouter.get("/course", async (req, res, next) => {
    console.log("Inside Getting single course");
    const _id = req.query.courseId;
    if (!_id) {
        return next(new Error("No Id found for the url"));
    }
    console.log(_id);
    try {
        const course = await Course.findOne({ _id });
        console.log(course);
        return res.status(200).json(course);
    }
    catch (err) {
        next(err);
    }
});
courseRouter.get("/courseDetail", async (req, res, next) => {
    console.log("Course Detail page");
    const _id = req.query._id;
    try {
        const course = await Course.findById(_id)
            .populate("content")
            .populate({ path: "tutor", select: "name" })
            .exec();
        console.log(course);
        return res.status(200).json(course);
    }
    catch (err) {
        next(err);
    }
});
courseRouter.get("/searchBar", async (req, res) => {
    const str = req.query.query;
    if (typeof str == "string") {
        const regex = new RegExp(str, "i"); // 'i' makes it case insensitive
        const courses = await Course.find({
            $or: [
                { title: { $regex: regex } },
                { description: { $regex: regex } },
                { subtitle: { $regex: regex } },
            ],
        }, "title _id");
        console.log(courses);
        return res.status(200).json(courses);
    }
});
courseRouter.get("/getAllCategoriesCourse", async (req, res, next) => {
    const categories = await Course.distinct("category");
    const courses = await Course.find({});
    return res.status(200).json({ categories, courses });
});
export default courseRouter;
//# sourceMappingURL=courses.routes.js.map