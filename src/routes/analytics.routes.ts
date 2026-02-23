import express from "express";
import { authenticate, isAdmin } from "../middlewares/auth.middleware";
import { getAnalytics } from "../controllers/analytics.controller";

const router = express.Router();

router.get("/", authenticate, isAdmin, getAnalytics);

export default router;