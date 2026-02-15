import { z } from "zod";
import { UserRole } from "../types/user.types";

export const CreateUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.nativeEnum(UserRole).optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;

// 🔑 New: Login DTO
export const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginUserDTO = z.infer<typeof LoginUserSchema>;
