import http from "http";
import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import mongoConnect from "./config/mongoConnector.js";
const PORT = parseInt(process.env.PORT!) || 8000;

const server = http.createServer(app);
const startServer = async () => {
  await mongoConnect();

  server.listen(PORT, async () => {
    console.log("Listining on port " + PORT);
  });
};

startServer();
