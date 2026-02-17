import { z } from "zod";

export const CreateProductSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  price: z.number().positive(),
  image: z.string(),
  category: z.string(),
  stock: z.number().int().nonnegative(),
  deliveryTime: z.string().optional(),
  isActive: z.boolean().optional(),
});

export type CreateProductDTO = z.infer<typeof CreateProductSchema>;

export const UpdateProductSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().min(10).optional(),
  price: z.number().positive().optional(),
  image: z.string().optional(),
  category: z.string().optional(),
  stock: z.number().int().nonnegative().optional(),
  deliveryTime: z.string().optional(),
  isActive: z.boolean().optional(),
});

export type UpdateProductDTO = z.infer<typeof UpdateProductSchema>;