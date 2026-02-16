import { z } from "zod";
import { UserRole } from "../types/user.types";

// ✅ Create User Schema
export const CreateUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.nativeEnum(UserRole).optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;

// ✅ Login Schema
export const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginUserDTO = z.infer<typeof LoginUserSchema>;

// ✅ Update User Schema (all fields optional)
export const UpdateUserSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  role: z.nativeEnum(UserRole).optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
});

export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>;