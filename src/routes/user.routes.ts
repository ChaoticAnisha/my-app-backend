import express from "express";
import { createUser, uploadAvatar, loginUser } from "../controllers/user.controller";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/:id/avatar", uploadAvatar);

export default router;
