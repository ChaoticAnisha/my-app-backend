import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from "../controllers/category.controller";

const router = express.Router();

// Category CRUD
router.post("/", createCategory);             
router.get("/", getAllCategories);            // Get all categories
router.get("/:id", getCategoryById);          // Get single category
router.put("/:id", updateCategory);           // Update category
router.delete("/:id", deleteCategory);        // Delete category

export default router;