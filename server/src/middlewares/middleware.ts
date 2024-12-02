import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";

interface CustomRequest extends Request {
  user?: {
    id: string;
    role: string;
    name: string;
    email: string;
  };
}

export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded as CustomRequest["user"];
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

export const authorize = (roles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access forbidden. Insufficient permissions." });
    }
    next();
  };
};
