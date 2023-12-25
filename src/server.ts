import http from "http";
import dotenv from "dotenv";
dotenv.config();
import app from "./app.ts";
import mongoConnect from "./service/mongoConnector.ts";
// import mongoConnect from "services/mongo.ts";
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);
const startServer = async () => {
  await mongoConnect();

  server.listen(PORT, () => {
    console.log("Listining on port " + PORT);
  });
};

startServer();
