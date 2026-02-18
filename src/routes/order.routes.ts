import express from "express";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/order.controller";

const router = express.Router();

router.post("/", createOrder);                        // Create order
router.get("/", getAllOrders);                        // Admin: get all orders
router.get("/user/:userId", getUserOrders);           // Client: get my orders
router.get("/:id", getOrderById);                     // Get single order
router.patch("/:id/status", updateOrderStatus);       // Admin: update status

export default router;