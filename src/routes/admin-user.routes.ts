import express, { Request, Response, NextFunction } from "express";
import { authenticate, isAdmin } from "../middlewares/auth.middleware";
import { avatarUpload, optimizeUploadedImage } from "../config/multer.config";
import {
  createUserAdmin,
  getAllUsersAdmin,
  getUserByIdAdmin,
  updateUserAdmin,
  deleteUserAdmin,
} from "../controllers/admin-user.controller";

const router = express.Router();

// Multer error handler
const handleMulterError = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    console.error("❌ Multer error:", err);
    return res.status(400).json({ success: false, message: err.message });
  }
  next();
};

// Normalize files middleware
const normalizeFiles = (req: Request, res: Response, next: NextFunction) => {
  if (req.files && Array.isArray(req.files) && req.files.length > 0) {
    req.file = req.files[0];
    console.log('✅ File normalized:', req.file.filename);
  }
  next();
};

// Admin User Routes
router.post("/", 
  avatarUpload.any(),
  handleMulterError,
  normalizeFiles,
  optimizeUploadedImage,
  authenticate,
  isAdmin,
  createUserAdmin
);

router.get("/", authenticate, isAdmin, getAllUsersAdmin);
router.get("/:id", authenticate, isAdmin, getUserByIdAdmin);

router.put("/:id", 
  avatarUpload.any(),
  handleMulterError,
  normalizeFiles,
  optimizeUploadedImage,
  authenticate,
  isAdmin,
  updateUserAdmin
);

router.delete("/:id", authenticate, isAdmin, deleteUserAdmin);

export default router;
