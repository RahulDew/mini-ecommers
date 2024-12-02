import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const MongoDB_URL = process.env.MONGODB_URL || "";

export async function connectDB() {
    
  try {
    await mongoose.connect(MongoDB_URL);
    console.log("Connected to MongoDB");
  } catch (error: any) {
    console.log("Can't Connect to MongoDB\n Error:", error.message);
  }
}
