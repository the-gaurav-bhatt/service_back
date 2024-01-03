import { Course, Icourse } from "../model/course";
import { getObjectUrl, putObjectToBucket } from "../config/aws";
import express, { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import verifyAuthentication from "../middlewares/authMiddleware";
import Chapter from "../model/chapter";
import mongoose from "mongoose";
import user from "../model/user";
const courseRouter = express.Router();

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

// courseRouter.use("/course", (req, res) => {
//   res.status(200).send("<h1> This is for Course api endpoint</h1>");
// });
courseRouter.post("/uploadPhoto", async (req: Request, res: Response) => {
  const data = req.body;
  console.log(data);
  try {
    const url = await putObjectToBucket(data.fileName, data.contentType);
    return res.status(200).json({ success: true, url });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ success: false });
  }
});

courseRouter.post("/getPhoto", async (req: Request, res: Response) => {
  const data = req.body;
  console.log(data);
  try {
    const url = await getObjectUrl(data.key);
    console.log("The url is " + url);
    return res.status(200).json({ success: true, url });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ success: false });
  }
});

courseRouter.post(
  "/hi",
  verifyAuthentication,
  async (req: AuthenticatedRequest, res: Response) => {
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
    } catch (err) {
      console.log(err);
    }

    console.log(data);
  }
);
courseRouter.post(
  "/editCourse",
  verifyAuthentication,
  async (req: AuthenticatedRequest, res: Response) => {
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
    } catch (err) {
      console.log(err);
    }
  }
);

courseRouter.delete(
  "/deleteCourse/:courseId",
  async (req: AuthenticatedRequest, res: Response) => {
    const { courseId } = req.params;
    console.log(courseId);
    try {
      const del = await Course.findByIdAndDelete({ _id: courseId });

      console.log(del);
      return res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      return res.status(404).json(null);
    }
  }
);

courseRouter.post(
  "/addSection",
  async (req: AuthenticatedRequest, res: Response) => {
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
    } catch (err) {
      console.log(err);
      return res
        .status(401)
        .json({ message: "Something went wrong while updating course" });
    }
  }
);

courseRouter.get(
  "/getCourses",
  verifyAuthentication,
  async (req: AuthenticatedRequest, res: Response) => {
    console.log("Get Courses Url Hit" + req.user.id);

    try {
      const us = await user.findById(req.user.id).populate("courses").exec();
      console.log(us);
      const course = await Course.find({ tutor: req.user.id });
      return res.status(200).json(course);
    } catch (err) {
      console.log(err);
      return res.status(404).json({ success: false });
    }
  }
);

courseRouter.get("/popularCourses", async (req: Request, res: Response) => {
  // console.log("Get Courses Url Hit" + req.user.id);

  try {
    const course = await Course.find({}).sort("-price").limit(10).exec();
    return res.status(200).json(course);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ success: false });
  }
});
courseRouter.get(
  "/course",
  async (req: AuthenticatedRequest, res: Response) => {
    console.log("Inside Getting single course");
    const _id = req.query.courseId;
    console.log(_id);
    try {
      const course = await Course.findOne({ _id });
      console.log(course);
      return res.status(200).json(course);
    } catch (err) {
      return res
        .status(402)
        .json({ messages: "Couldnt find any course with given id " });
    }
  }
);

courseRouter.get("/courseDetail", async (req: Request, res: Response) => {
  const _id = req.query._id;
  const course = await Course.findById(_id)
    .populate("content")
    .populate({ path: "tutor", select: "name" })
    .exec();
  console.log(course);
  return res.status(200).json(course);
});

courseRouter.get("/searchBar", async (req: Request, res: Response) => {
  const str = req.query.query;
  if (typeof str == "string") {
    const regex = new RegExp(str, "i"); // 'i' makes it case insensitive
    const courses = await Course.find(
      {
        $or: [
          { title: { $regex: regex } },
          { description: { $regex: regex } },
          { subtitle: { $regex: regex } },
        ],
      },
      "title _id"
    );

    console.log(courses);
    return res.status(200).json(courses);
  }
});
export default courseRouter;
