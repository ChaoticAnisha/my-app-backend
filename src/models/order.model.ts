import mongoose, { Document, Schema } from "mongoose";

export interface IOrderItem {
  productId: mongoose.Types.ObjectId;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface IOrder {
  userId: mongoose.Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  status: "pending" | "confirmed" | "processing" | "out_for_delivery" | "delivered" | "cancelled";
  deliveryAddress: string;
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "failed";
  note?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderDocument extends IOrder, Document {}

const OrderItemSchema = new Schema<IOrderItem>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const OrderSchema = new Schema<OrderDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [OrderItemSchema],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "processing", "out_for_delivery", "delivered", "cancelled"],
      default: "pending",
    },
    deliveryAddress: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    note: { type: String },
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model<OrderDocument>("Order", OrderSchema);