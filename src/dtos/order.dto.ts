import { z } from "zod";

export const CreateOrderSchema = z.object({
  items: z.array(z.object({
    productId: z.string().min(1),
    name: z.string().min(1),
    image: z.string(),
    price: z.number().positive(),
    quantity: z.number().int().positive(),
  })).min(1, "Order must have at least one item"),
  totalAmount: z.number().positive(),
  deliveryAddress: z.string().min(5, "Delivery address is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
  note: z.string().optional(),
});

export const UpdateOrderStatusSchema = z.object({
  status: z.enum(["pending", "confirmed", "processing", "out_for_delivery", "delivered", "cancelled"]),
});

export type CreateOrderDTO = z.infer<typeof CreateOrderSchema>;
export type UpdateOrderStatusDTO = z.infer<typeof UpdateOrderStatusSchema>;