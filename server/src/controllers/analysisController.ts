import { Request, Response } from "express";
import Product from "../models/Product";
import User from "../models/User";
import Order from "../models/Order";

export const getOverview = async (req: Request, res: Response) => {
  try {
    const productCount = await Product.countDocuments({});
    const orderCount = await Order.countDocuments({});
    const userCount = await User.countDocuments({ role: "user" });

    // Total products sold: Sum of quantities from all orders
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
    const totalProductSold = orderQuantityCount[0].totalQuantity;

    // Total revenue: Sum of totalPrice from all completed orders.
    const totalRevenueCheck = await Order.aggregate([
      {
        $match: { status: "Completed" },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);
    const totalRevenue = totalRevenueCheck[0].totalRevenue;

    res.status(200).json({
      productCount,
      orderCount,
      userCount,
      totalProductSold,
      totalRevenue,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving Overview details", error });
  }
};
