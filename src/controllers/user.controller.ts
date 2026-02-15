import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { CreateUserSchema, LoginUserSchema } from "../dtos/user.dto";

const service = new UserService();

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = CreateUserSchema.parse(req.body);
    const user = await service.createUser(parsed);
    res.status(201).json({ 
      success: true, 
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (err) {
    next(err);
  }
};

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

// 🔑 Login controller - UPDATED
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = LoginUserSchema.parse(req.body);
    const user = await service.login(parsed.email, parsed.password);
    
    res.json({ 
      success: true, 
      data: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (err) {
    next(err);
  }
};