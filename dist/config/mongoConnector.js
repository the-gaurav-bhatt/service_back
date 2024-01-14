import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
mongoose.connection.on("open", () => {
    console.log("MongoDb is Ready Now...");
});
mongoose.connection.on("error", (err) => {
    console.log(err);
});
function mongoConnect() {
    mongoose.connect(MONGO_URI);
}
export default mongoConnect;
//# sourceMappingURL=mongoConnector.js.map