import { Request, Response, NextFunction } from "express";
import { OrderService } from "../services/order.service";
import { CreateOrderSchema, UpdateOrderStatusSchema } from "../dtos/order.dto";

const service = new OrderService();

// ✅ Create Order (Client)
export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.body.userId;
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const parsed = CreateOrderSchema.parse(req.body);
    const order = await service.createOrder(userId, parsed);

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order,
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Get All Orders (Admin)
export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;

    const result = await service.getAllOrders(page, limit, status);

    res.json({
      success: true,
      data: result.orders,
      pagination: {
        total: result.total,
        page,
        limit,
        totalPages: Math.ceil(result.total / limit),
      },
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Get User Orders (Client)
export const getUserOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await service.getUserOrders(userId, page, limit);

    res.json({
      success: true,
      data: result.orders,
      pagination: {
        total: result.total,
        page,
        limit,
        totalPages: Math.ceil(result.total / limit),
      },
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Get Single Order
export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await service.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.json({ success: true, order });
  } catch (err) {
    next(err);
  }
};

// ✅ Update Order Status (Admin)
export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = UpdateOrderStatusSchema.parse(req.body);
    const order = await service.updateOrderStatus(req.params.id, parsed.status);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (err) {
    next(err);
  }
};