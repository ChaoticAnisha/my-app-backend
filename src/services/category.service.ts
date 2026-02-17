import { CategoryRepository } from "../repositories/category.repository";
import { CreateCategoryDTO, UpdateCategoryDTO } from "../dtos/category.dto";
import { ApiError } from "../errors/ApiError";

export class CategoryService {
  private repo = new CategoryRepository();

  async createCategory(data: CreateCategoryDTO) {
    const exists = await this.repo.findByName(data.name);
    if (exists) throw new ApiError(409, "Category already exists");
    
    return this.repo.create(data);
  }

  async getAllCategories() {
    return this.repo.findAll();
  }

  async getCategoryById(categoryId: string) {
    const category = await this.repo.findById(categoryId);
    if (!category) throw new ApiError(404, "Category not found");
    return category;
  }

  async updateCategory(categoryId: string, data: UpdateCategoryDTO) {
    const category = await this.repo.findById(categoryId);
    if (!category) throw new ApiError(404, "Category not found");
    
    // If name is being changed, check if new name exists
    if (data.name && data.name !== category.name) {
      const nameExists = await this.repo.findByName(data.name);
      if (nameExists) throw new ApiError(409, "Category name already exists");
    }
    
    return this.repo.update(categoryId, data);
  }

  async deleteCategory(categoryId: string) {
    const category = await this.repo.findById(categoryId);
    if (!category) throw new ApiError(404, "Category not found");
    
    return this.repo.delete(categoryId);
  }
}