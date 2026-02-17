import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { CreateUserSchema, LoginUserSchema, UpdateUserSchema } from "../dtos/user.dto";
import { UserModel } from "../models/user.model";
import { ProductModel } from "../models/product.model";
import { CategoryModel } from "../models/category.model";

const service = new UserService();

// Create User (Registration)
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = CreateUserSchema.parse(req.body);
    const user = await service.createUser(parsed);
    res.status(201).json({ 
      success: true, 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role
      }
    });
  } catch (err) {
    next(err);
  }
};

// Login User
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = LoginUserSchema.parse(req.body);
    const user = await service.login(parsed.email, parsed.password);
    res.json({ 
      success: true, 
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role
      }
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Get Dashboard Stats
export const getDashboardStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const totalUsers = await UserModel.countDocuments();
    const totalProducts = await ProductModel.countDocuments();
    const totalCategories = await CategoryModel.countDocuments();
    const activeProducts = await ProductModel.countDocuments({ isActive: true });

    // Get recent products
    const recentProducts = await ProductModel
      .find()
      .sort({ createdAt: -1 })
      .limit(5);

    // Get recent users
    const recentUsers = await UserModel
      .find()
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalProducts,
        totalCategories,
        activeProducts,
        totalOrders: 0,
        totalRevenue: 0,
      },
      recentProducts,
      recentUsers,
    });
  } catch (err) {
    next(err);
  }
};

// Get All Users
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string || '';
    const result = await service.getAllUsers(page, limit, search);
    res.json({
      success: true,
      data: result.users,
      pagination: {
        total: result.total,
        page,
        limit,
        totalPages: Math.ceil(result.total / limit)
      }
    });
  } catch (err) {
    next(err);
  }
};

// Get Single User by ID
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await service.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        avatar: user.avatar,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (err) {
    next(err);
  }
};

// Update User
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = UpdateUserSchema.parse(req.body);
    const user = await service.updateUser(req.params.id, parsed);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({
      success: true,
      message: "User updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role
      }
    });
  } catch (err) {
    next(err);
  }
};

// Delete User
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await service.deleteUser(req.params.id);
    res.json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Upload Avatar
export const uploadAvatar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Avatar required" });
    }
    const avatarPath = `/uploads/${req.file.filename}`;
    const user = await service.uploadAvatar(req.params.id, avatarPath);
    res.json(user);
  } catch (err) {
    next(err);
  }
};