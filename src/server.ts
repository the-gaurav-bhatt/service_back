import http from "http";
import dotenv from "dotenv";
dotenv.config();
// import { getObjectUrl } from "./config/aws.ts";
import app from "./app.ts";
import mongoConnect from "./config/mongoConnector.ts";
// import mongoConnect from "services/mongo.ts";
const PORT = parseInt(process.env.PORT!) || 8000;

const server = http.createServer(app);
const startServer = async () => {
  await mongoConnect();

  server.listen(PORT, async () => {
    // console.log(
    //   "THe Url is " +
    //     (await getObjectUrl("1703946490483-Screenshot 2023-08-14 154828.png"))
    // );

    console.log("Listining on port " + PORT);
  });
};

startServer();
