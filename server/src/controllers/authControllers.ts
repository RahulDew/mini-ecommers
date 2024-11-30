import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_SECRET } from "../config/config";

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  console.log(req.body);
  try {
    const user = new User({ name, email, password, role });
    await user.save();
    console.log("User registered successfully");
    res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email });
    console.log("USER", user);

    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: "User not found" });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      console.log("Invalid credentials");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "50h" }
    );

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: false, // Set to true in production (HTTPS)
    //   sameSite: "lax",
    // });
    res.cookie("token", token);
    res.status(200).json({ message: "Login successful" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};
