import mongoose, { Schema, Document } from "mongoose";
import { UserRole } from "../types/user.types";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string; 
  role: UserRole;
  address?: string;
  phone?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // new field
    role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
    address: String,
    phone: String,
    avatar: String,
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<UserDocument>("User", UserSchema);
