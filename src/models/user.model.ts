import mongoose, { Schema, Document } from "mongoose";
import { UserRole } from "../types/user.types";

export interface IUser {
  name: string;
  email: string;
  password: string; 
  role: UserRole;
  address?: string;
  phone?: string;
  avatar?: string;
  resetPasswordToken?: string;  // ✅ Add this
  resetPasswordExpires?: Date;  // ✅ Add this
  createdAt: Date;
  updatedAt: Date;
}

export interface UserDocument extends Document, IUser {}

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      enum: Object.values(UserRole),
      default: UserRole.USER
    },
    address: String,
    phone: String,
    avatar: String,
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<UserDocument>("User", UserSchema);