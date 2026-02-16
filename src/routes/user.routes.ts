import express from "express";
import { 
  createUser, 
  loginUser, 
  getAllUsers, 
  getUserById, 
  updateUser, 
  deleteUser, 
  uploadAvatar 
} from "../controllers/user.controller";

const router = express.Router();

// Auth Routes
router.post("/register", createUser);
router.post("/login", loginUser);

// User CRUD Routes
router.get("/", getAllUsers);           // Get all users
router.get("/:id", getUserById);        // Get single user
router.put("/:id", updateUser);         // Update user
router.delete("/:id", deleteUser);      // Delete user

// Avatar Upload
router.post("/:id/avatar", uploadAvatar);

export default router;