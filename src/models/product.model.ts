import mongoose, { Schema, Document } from "mongoose";

export interface IProduct {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  deliveryTime: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductDocument extends Document, IProduct {}

const ProductSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    deliveryTime: { type: String, default: '16' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model<ProductDocument>("Product", ProductSchema);