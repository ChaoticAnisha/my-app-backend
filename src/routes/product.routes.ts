import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateStock
} from "../controllers/product.controller";
import { uploadProductImage } from "../middlewares/upload.middleware";

const router = express.Router();

// ✅ Product CRUD with image upload
router.post("/", uploadProductImage.single("image"), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", uploadProductImage.single("image"), updateProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id/stock", updateStock);

export default router;