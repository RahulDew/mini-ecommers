import mongoose, { Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  category: string;
  stockQuantity: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: {type: String, required: true},
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stockQuantity: { type: Number, required: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt automatically
);

export default mongoose.model<IProduct>("Product", ProductSchema);
