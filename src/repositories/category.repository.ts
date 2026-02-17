import { CategoryModel, CategoryDocument } from "../models/category.model";
import { CreateCategoryDTO, UpdateCategoryDTO } from "../dtos/category.dto";
import { ProductModel } from "../models/product.model";

export class CategoryRepository {
  async create(data: CreateCategoryDTO): Promise<CategoryDocument> {
    return CategoryModel.create(data);
  }

  async findById(id: string): Promise<CategoryDocument | null> {
    return CategoryModel.findById(id);
  }

  async findByName(name: string): Promise<CategoryDocument | null> {
    return CategoryModel.findOne({ name });
  }

  async findAll() {
    const categories = await CategoryModel.find().sort({ name: 1 });
    
    // Get product count for each category
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const productsCount = await ProductModel.countDocuments({ 
          category: category.name 
        });
        return {
          ...category.toObject(),
          productsCount
        };
      })
    );
    
    return categoriesWithCount;
  }

  async update(id: string, data: UpdateCategoryDTO): Promise<CategoryDocument | null> {
    return CategoryModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );
  }

  async delete(id: string): Promise<CategoryDocument | null> {
    return CategoryModel.findByIdAndDelete(id);
  }
}