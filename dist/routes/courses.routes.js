import express from "express";
import verifyAuthentication from "../middlewares/authMiddleware.js";
import { addSections, createCourse, deleteCourse, editCourse, getAllCategoriesCourse, getCourse, getCourseDetail, getPhoto, getPopularCourses, getUserCourses, showSearches, uplaodPhoto, } from "./courses.controller.js";
const courseRouter = express.Router();
// courseRouter.use("/course", (req, res) => {
//   res.status(200).send("<h1> This is for Course api endpoint</h1>");
// });
courseRouter.post("/uploadPhoto", uplaodPhoto);
courseRouter.post("/getPhoto", getPhoto);
courseRouter.post("/hi", verifyAuthentication, createCourse);
courseRouter.post("/editCourse", verifyAuthentication, editCourse);
courseRouter.delete("/deleteCourse/:courseId", verifyAuthentication, deleteCourse);
courseRouter.post("/addSection", addSections);
courseRouter.get("/getCourses", verifyAuthentication, getUserCourses);
courseRouter.get("/popularCourses", getPopularCourses);
courseRouter.get("/course", getCourse);
courseRouter.get("/courseDetail", getCourseDetail);
courseRouter.get("/searchBar", showSearches);
courseRouter.get("/getAllCategoriesCourse", getAllCategoriesCourse);
export default courseRouter;
//# sourceMappingURL=courses.routes.js.map