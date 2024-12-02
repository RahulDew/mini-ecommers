import { Request, Response } from "express";
import Order from "../models/Order";

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({}).populate("product");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { email, product, customerId, customerName, status, quantity } =
      req.body;
    const newOrder = new Order({
      customerId,
      customerName,
      email,
      product,
      status,
      quantity,
    });
    await newOrder.save();
    res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const updateOrder = async (req: Request, res: Response) => {
  const { status } = req.body;
  try {
    console.log("Order ID:", req.params.id);
    console.log("STATUS:", status);
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: status },
      { new: true }
    );
    console.log("Order Updated:", updatedOrder);
    res.status(200).json({ message: "Order Updated" });
  } catch (err) {
    res.status(500).json({ message: "Order not updated" });
  }
};
export const userOrders = async (req: Request, res: Response) => {
  console.log(req.params.userId);
  try {
    const orders = await Order.find({ customerId: req.params.userId }).populate(
      "product"
    );
    console.log(orders);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
