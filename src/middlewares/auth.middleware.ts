import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/ApiError";

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

// Mock authentication middleware 
// This extracts user info from request headers/cookies
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // For now, we'll check if userId is passed in headers 
    const userId = req.headers['x-user-id'] as string;
    const userRole = req.headers['x-user-role'] as string;
    const userEmail = req.headers['x-user-email'] as string;

    if (!userId) {
      throw new ApiError(401, "Authentication required");
    }

    // Attach user to request
    req.user = {
      id: userId,
      email: userEmail || '',
      role: userRole || 'user'
    };

    next();
  } catch (error) {
    next(error);
  }
};

// Check if user is admin
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "Authentication required");
    }

    if (req.user.role !== 'admin') {
      throw new ApiError(403, "Admin access required");
    }

    next();
  } catch (error) {
    next(error);
  }
};