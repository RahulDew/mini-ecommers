import Product from "../models/Product";

import { Request, Response } from "express";
import User from "../models/User";
import Order from "../models/Order";

export const getOverview = async (req: Request, res: Response) => {
  try {
    const productCount = await Product.countDocuments({});
    const orderCount = await Order.countDocuments({});
    const userCount = await User.countDocuments({ role: "user" });

    const orderQuantityCount = await Order.aggregate([
      {
        $match: { status: "Completed" },
      },
      {
        $group: {
          _id: null,
          totalQuantity: { $sum: "$quantity" },
        },
      },
    ]);
    const totalQuantity = orderQuantityCount[0].totalQuantity;

    res.status(200).json({
      productCount,
      orderCount,
      userCount,
      totalQuantity,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving document counts", error });
  }
};
