import Product from "../models/Product";
import { Request, Response } from "express";

export const getAllProducts = async (req: Request, res: Response) => {
  const allProducts = await Product.find({}).sort({ timestamp: -1 });
  if (allProducts) {
    res.status(200).json(allProducts);
  } else {
    res.status(404).json({ message: "Products not found" });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

export const addProduct = async (req: Request, res: Response) => {
  const { name, description, price, imageUrl, category, stockQuantity } =
    req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      imageUrl,
      category,
      stockQuantity,
    });
    await newProduct.save();
    res.status(201).json({ message: "Product uploaded successfully" });
  } catch (err) {
    res.status(500).json({ message: "Products not Added" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.status(200).json({ message: "product Updated" });
  } catch (err) {
    res.status(500).json({ message: "product not updated" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "product deleted" });
  } catch (err) {
    res.status(500).json({ message: "can't able to delete product" });
  }
};
