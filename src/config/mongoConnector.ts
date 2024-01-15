import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

mongoose.connection.on("open", () => {});
mongoose.connection.on("error", (err) => {});
function mongoConnect() {
  mongoose.connect(MONGO_URI!);
}

export default mongoConnect;
