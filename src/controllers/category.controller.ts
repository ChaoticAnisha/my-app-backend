import { Request, Response, NextFunction } from "express";
import { CategoryService } from "../services/category.service";
import { CreateCategorySchema, UpdateCategorySchema } from "../dtos/category.dto";

const service = new CategoryService();

// ✅ Create Category
export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = CreateCategorySchema.parse(req.body);
    const category = await service.createCategory(parsed);
    
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category: {
        id: category._id,
        name: category.name,
        image: category.image,
        description: category.description,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt
      }
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Get All Categories
export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await service.getAllCategories();
    
    res.json({
      success: true,
      data: categories
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Get Category by ID
export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await service.getCategoryById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }
    
    res.json({
      success: true,
      category: {
        id: category._id,
        name: category.name,
        image: category.image,
        description: category.description,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt
      }
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Update Category
export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = UpdateCategorySchema.parse(req.body);
    const category = await service.updateCategory(req.params.id, parsed);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }
    
    res.json({
      success: true,
      message: "Category updated successfully",
      category: {
        id: category._id,
        name: category.name,
        image: category.image,
        description: category.description,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt
      }
    });
  } catch (err) {
    next(err);
  }
};

// Delete Category
export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await service.deleteCategory(req.params.id);
    
    res.json({
      success: true,
      message: "Category deleted successfully"
    });
  } catch (err) {
    next(err);
  }
};