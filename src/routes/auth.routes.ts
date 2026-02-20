import express from "express";
import { createUser, loginUser } from "../controllers/user.controller";
import { forgotPassword, resetPassword } from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;