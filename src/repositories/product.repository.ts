import { ProductModel, ProductDocument } from "../models/product.model";
import { CreateProductDTO, UpdateProductDTO } from "../dtos/product.dto";

export class ProductRepository {
  async create(data: CreateProductDTO): Promise<ProductDocument> {
    return ProductModel.create(data);
  }

  async findById(id: string): Promise<ProductDocument | null> {
    return ProductModel.findById(id);
  }

  async findAll(page: number, limit: number, search: string, category?: string) {
    const skip = (page - 1) * limit;
    
    const searchQuery: any = {};
    
    if (search) {
      searchQuery.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }
    
    if (category) {
      searchQuery.category = category;
    }
    
    const products = await ProductModel
      .find(searchQuery)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    
    const total = await ProductModel.countDocuments(searchQuery);
    
    return { products, total };
  }

  async update(id: string, data: UpdateProductDTO): Promise<ProductDocument | null> {
    return ProductModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );
  }

  async delete(id: string): Promise<ProductDocument | null> {
    return ProductModel.findByIdAndDelete(id);
  }

  async updateStock(id: string, quantity: number): Promise<ProductDocument | null> {
    return ProductModel.findByIdAndUpdate(
      id,
      { $inc: { stock: quantity } },
      { new: true }
    );
  }
}