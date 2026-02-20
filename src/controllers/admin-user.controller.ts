import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { CreateUserSchema, UpdateUserSchema } from "../dtos/user.dto";

const service = new UserService();

// Create User (Admin) with optional avatar
export const createUserAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Admin creating user');
    console.log('Body:', req.body);
    console.log('File:', req.file);
    console.log('Content-Type:', req.headers['content-type']);
    
    // Check if we have multipart form data
    if (!req.headers['content-type']?.includes('multipart/form-data')) {
      console.warn('Not multipart/form-data!');
    }

    const parsed = CreateUserSchema.parse(req.body);
    
    // Add avatar path if file uploaded
    const userData: any = {
      ...parsed,
    };
    
    if (req.file) {
      console.log('File found! Filename:', req.file.filename);
      userData.avatar = `/uploads/${req.file.filename}`;
    } else {
      console.log('No file uploaded');
    }

    const user = await service.createUser(userData);
    
    res.status(201).json({ 
      success: true,
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (err) {
    console.error('Error creating user:', err);
    next(err);
  }
};


// Get All Users (Admin) - with pagination
export const getAllUsersAdmin = async (req: Request, res: Response, next: NextFunction) => {
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

// Get Single User (Admin)
export const getUserByIdAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await service.getUserById(req.params.id);
    
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

// Update User (Admin) with optional avatar
export const updateUserAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('✏️ Admin updating user:', req.params.id);
    console.log('Body:', req.body);
    console.log('File:', req.file);

    const parsed = UpdateUserSchema.parse(req.body);
    
    // Add avatar path if file uploaded
    const updateData = {
      ...parsed,
      avatar: req.file ? `/uploads/${req.file.filename}` : undefined
    };

    const user = await service.updateUser(req.params.id, updateData);
    
    res.json({
      success: true,
      message: "User updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (err) {
    next(err);
  }
};

// Delete User (Admin)
export const deleteUserAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('🗑️ Admin deleting user:', req.params.id);
    
    await service.deleteUser(req.params.id);
    
    res.json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (err) {
    next(err);
  }
};