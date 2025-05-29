import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
const MONGO_URI = process.env.MONGO_URI

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${MONGO_URI}/${DB_NAME}`
    );

    console.log(
      `\n MongoDB connected!! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("YES")
    console.log(`MONGO_URI: ${MONGO_URI}`);
    console.log(`DB_NAME: ${DB_NAME}`);
    console.log("MONGODB connection error", error);
    process.exit(1);
  }
};

export default connectDB;
