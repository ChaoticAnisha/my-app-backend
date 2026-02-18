import express from "express";
import { 
  createUser, 
  loginUser,
  getDashboardStats,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  uploadAvatar
} from "../controllers/user.controller";
import { uploadAvatar as uploadAvatarMiddleware } from "../middlewares/upload.middleware";

const router = express.Router();

// Auth Routes
router.post("/register", createUser);
router.post("/login", loginUser);

// Dashboard Stats
router.get("/stats/dashboard", getDashboardStats);

// User CRUD Routes
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

// Avatar Upload
router.post("/:id/avatar", uploadAvatarMiddleware.single("avatar"), uploadAvatar);

export default router;