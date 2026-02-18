import { OrderRepository } from "../repositories/order.repository";
import { CreateOrderDTO } from "../dtos/order.dto";

const repo = new OrderRepository();

export class OrderService {
  async createOrder(userId: string, data: CreateOrderDTO) {
    return await repo.create(userId, data);
  }

  async getAllOrders(page: number, limit: number, status?: string) {
    return await repo.findAll(page, limit, status);
  }

  async getUserOrders(userId: string, page: number, limit: number) {
    return await repo.findByUserId(userId, page, limit);
  }

  async getOrderById(orderId: string) {
    return await repo.findById(orderId);
  }

  async updateOrderStatus(orderId: string, status: string) {
    return await repo.updateStatus(orderId, status);
  }

  async getTotalRevenue() {
    return await repo.getTotalRevenue();
  }

  async countByStatus() {
    return await repo.countByStatus();
  }
}