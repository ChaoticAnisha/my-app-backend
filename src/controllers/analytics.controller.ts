import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user.model";
import { ProductModel } from "../models/product.model";
import { CategoryModel } from "../models/category.model";

export const getAnalytics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { OrderModel } = await import("../models/order.model");

    // Basic Stats
    const totalUsers = await UserModel.countDocuments();
    const totalProducts = await ProductModel.countDocuments();
    const totalCategories = await CategoryModel.countDocuments();
    const totalOrders = await OrderModel.countDocuments();

    // Revenue
    const revenueResult = await OrderModel.aggregate([
      { $match: { status: { $ne: "cancelled" } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;

    // User Growth (Last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const userGrowth = await UserModel.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Orders by Status
    const ordersByStatus = await OrderModel.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    // Revenue over time (Last 7 days)
    const revenueOverTime = await OrderModel.aggregate([
      { 
        $match: { 
          createdAt: { $gte: sevenDaysAgo },
          status: { $ne: "cancelled" }
        } 
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          revenue: { $sum: "$totalAmount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Top Products
    const topProducts = await OrderModel.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productId",
          totalSold: { $sum: "$items.quantity" },
          revenue: { $sum: { $multiply: ["$items.quantity", "$items.price"] } }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 }
    ]);

    // Populate product details
    const topProductsWithDetails = await ProductModel.populate(topProducts, {
      path: '_id',
      select: 'name image'
    });

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalProducts,
        totalCategories,
        totalOrders,
        totalRevenue
      },
      userGrowth,
      ordersByStatus,
      revenueOverTime,
      topProducts: topProductsWithDetails
    });
  } catch (err) {
    next(err);
  }
};