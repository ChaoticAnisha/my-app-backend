import { OrderModel } from "../models/order.model";
import { CreateOrderDTO } from "../dtos/order.dto";
import mongoose from "mongoose";

export class OrderRepository {
  async create(userId: string, data: CreateOrderDTO) {
    const order = new OrderModel({
      userId: new mongoose.Types.ObjectId(userId),
      items: data.items.map(item => ({
        ...item,
        productId: new mongoose.Types.ObjectId(item.productId),
      })),
      totalAmount: data.totalAmount,
      deliveryAddress: data.deliveryAddress,
      paymentMethod: data.paymentMethod,
      note: data.note,
    });
    return await order.save();
  }

  async findAll(page: number, limit: number, status?: string) {
    const query: any = {};
    if (status && status !== "all") query.status = status;

    const skip = (page - 1) * limit;
    const total = await OrderModel.countDocuments(query);
    const orders = await OrderModel
      .find(query)
      .populate("userId", "name email phone avatar")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return { orders, total };
  }

  async findByUserId(userId: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const total = await OrderModel.countDocuments({ userId });
    const orders = await OrderModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    return { orders, total };
  }

  async findById(orderId: string) {
    return await OrderModel
      .findById(orderId)
      .populate("userId", "name email phone avatar");
  }

  async updateStatus(orderId: string, status: string) {
    return await OrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).populate("userId", "name email phone avatar");
  }

  async getTotalRevenue() {
    const result = await OrderModel.aggregate([
      { $match: { status: { $ne: "cancelled" } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    return result[0]?.total || 0;
  }

  async countByStatus() {
    const result = await OrderModel.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);
    return result;
  }
}