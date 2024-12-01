import mongoose, { Schema } from "mongoose";

export interface IOrder extends Document {
  customerName: string;
  email: string;
  product: mongoose.Types.ObjectId; // Reference to a Product
  quantity: number;
  status: "Pending" | "Completed" | "Cancelled";
  createdAt: Date;
}

const OrderSchema: Schema = new Schema<IOrder>(
  {
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", OrderSchema);
