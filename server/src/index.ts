import express, { Request, Response } from "express";
// import cors from "cors";
import cors from "cors";

import dotenv from "dotenv";
import { connectDB } from "./connection/connect";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// // Routes
// app.get("/", (req: Request, res: Response) => {
//   res.json({ message: "Welcome to the TypeScript backend!" });
// });
connectDB();

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
// app.use("/orders", authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost123:${PORT}`);
});
