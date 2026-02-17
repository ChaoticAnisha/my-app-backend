import mongoose, { Schema, Document } from "mongoose";

export interface ICategory {
  name: string;
  image: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryDocument extends Document, ICategory {}

const CategorySchema = new Schema<CategoryDocument>(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export const CategoryModel = mongoose.model<CategoryDocument>("Category", CategorySchema);