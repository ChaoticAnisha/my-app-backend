import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/product.service";
import { CreateProductSchema, UpdateProductSchema } from "../dtos/product.dto";

const service = new ProductService();

// ✅ Create Product
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Handle image upload
    let imagePath = req.body.image || '';
    if (req.file) {
      imagePath = `/uploads/products/${req.file.filename}`;
    }

    const productData = {
      ...req.body,
      image: imagePath,
      price: parseFloat(req.body.price),
      stock: parseInt(req.body.stock),
      isActive: req.body.isActive === 'true' || req.body.isActive === true,
    };

    const parsed = CreateProductSchema.parse(productData);
    const product = await service.createProduct(parsed);
    
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: {
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category,
        stock: product.stock,
        deliveryTime: product.deliveryTime,
        isActive: product.isActive,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      }
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Get All Products
export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string || '';
    const category = req.query.category as string;
    
    const result = await service.getAllProducts(page, limit, search, category);
    
    res.json({
      success: true,
      data: result.products,
      pagination: {
        total: result.total,
        page,
        limit,
        totalPages: Math.ceil(result.total / limit)
      }
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Get Product by ID
export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await service.getProductById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }
    
    res.json({
      success: true,
      product: {
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category,
        stock: product.stock,
        deliveryTime: product.deliveryTime,
        isActive: product.isActive,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      }
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Update Product
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let imagePath = req.body.image || '';
    if (req.file) {
      imagePath = `/uploads/products/${req.file.filename}`;
    }

    const productData = {
      ...req.body,
      ...(imagePath && { image: imagePath }),
      ...(req.body.price && { price: parseFloat(req.body.price) }),
      ...(req.body.stock && { stock: parseInt(req.body.stock) }),
      ...(req.body.isActive !== undefined && { 
        isActive: req.body.isActive === 'true' || req.body.isActive === true 
      }),
    };

    const parsed = UpdateProductSchema.parse(productData);
    const product = await service.updateProduct(req.params.id, parsed);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }
    
    res.json({
      success: true,
      message: "Product updated successfully",
      product: {
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category,
        stock: product.stock,
        deliveryTime: product.deliveryTime,
        isActive: product.isActive,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      }
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Delete Product
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await service.deleteProduct(req.params.id);
    
    res.json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Update Stock
export const updateStock = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { quantity } = req.body;
    
    if (typeof quantity !== 'number') {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a number"
      });
    }
    
    const product = await service.updateStock(req.params.id, quantity);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }
    
    res.json({
      success: true,
      message: "Stock updated successfully",
      product
    });
  } catch (err) {
    next(err);
  }
};