import mongoose from "mongoose";
import { config } from "./config.js";

export async function connectDB() {
  if (!config.mongoUri) {
    throw new Error("MONGO_URI is not set");
  }
  await mongoose.connect(config.mongoUri);
  console.log("Mongo connected");
}
