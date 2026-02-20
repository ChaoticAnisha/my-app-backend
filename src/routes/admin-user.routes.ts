import express from "express";
import { authenticate, isAdmin } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload.middleware";
import {
  createUserAdmin,
  getAllUsersAdmin,
  getUserByIdAdmin,
  updateUserAdmin,
  deleteUserAdmin,
} from "../controllers/admin-user.controller";

const router = express.Router();

// All routes require authentication and admin role
router.use(authenticate);
router.use(isAdmin);

// Admin User Routes - IMPORTANT: upload.single() must be BEFORE the controller
router.post("/", upload.single('avatar'), createUserAdmin);  // ✅ Correct order
router.get("/", getAllUsersAdmin);
router.get("/:id", getUserByIdAdmin);
router.put("/:id", upload.single('avatar'), updateUserAdmin);  // ✅ Correct order
router.delete("/:id", deleteUserAdmin);

export default router;