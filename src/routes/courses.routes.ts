import { Course, Icourse } from "../model/course";
import { getObjectUrl, putObjectToBucket } from "../config/aws";
import express, { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import verifyAuthentication from "../middlewares/authMiddleware";
import Chapter from "../model/chapter";
import mongoose from "mongoose";
const courseRouter = express.Router();

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

courseRouter.use("/course", (req, res) => {
  res.status(200).send("<h1> This is for Course api endpoint</h1>");
});
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
  async (req: AuthenticatedRequest, res: Response) => {
    console.log("Get Courses Url Hit");
    try {
      const course = await Course.find({});
      return res.status(200).json(course);
    } catch (err) {
      return res.status(402).json({ messages: "Couldnt find any courses " });
    }
  }
);

export default courseRouter;
