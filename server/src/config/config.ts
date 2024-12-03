import dotenv from "dotenv";
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET as string;
export const CLIENT_URL = process.env.CLIENT_URL as string;
export const MongoDB_URL = process.env.MONGODB_URL as string;
