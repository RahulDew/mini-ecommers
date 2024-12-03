import mongoose, { Schema } from "mongoose";

export interface IOrder extends Document {
  customerId: string;
  customerName: string;
  email: string;
  product: mongoose.Types.ObjectId; // Reference to a Product
  quantity: number;
  status: "Pending" | "Completed" | "Cancelled";
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema<IOrder>(
  {
    customerId: { type: String, required: true },
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", OrderSchema);
