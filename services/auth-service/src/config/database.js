import mongoose from "mongoose";
import { env } from "./env.js";

async function connectToDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/authdb?authSource=admin");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

export default connectToDB;
