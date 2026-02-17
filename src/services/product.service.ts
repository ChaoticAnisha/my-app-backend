import { ProductRepository } from "../repositories/product.repository";
import { CreateProductDTO, UpdateProductDTO } from "../dtos/product.dto";
import { ApiError } from "../errors/ApiError";

export class ProductService {
  private repo = new ProductRepository();

  async createProduct(data: CreateProductDTO) {
    return this.repo.create(data);
  }

  async getAllProducts(page: number, limit: number, search: string, category?: string) {
    return this.repo.findAll(page, limit, search, category);
  }

  async getProductById(productId: string) {
    const product = await this.repo.findById(productId);
    if (!product) throw new ApiError(404, "Product not found");
    return product;
  }

  async updateProduct(productId: string, data: UpdateProductDTO) {
    const product = await this.repo.findById(productId);
    if (!product) throw new ApiError(404, "Product not found");
    
    return this.repo.update(productId, data);
  }

  async deleteProduct(productId: string) {
    const product = await this.repo.findById(productId);
    if (!product) throw new ApiError(404, "Product not found");
    
    return this.repo.delete(productId);
  }

  async updateStock(productId: string, quantity: number) {
    const product = await this.repo.findById(productId);
    if (!product) throw new ApiError(404, "Product not found");
    
    return this.repo.updateStock(productId, quantity);
  }
}