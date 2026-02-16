import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user.repository";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/user.dto";
import { ApiError } from "../errors/ApiError";

export class UserService {
  private repo = new UserRepository();

  // ✅ Create User
  async createUser(data: CreateUserDTO) {
    const exists = await this.repo.findByEmail(data.email);
    if (exists) throw new ApiError(409, "User already exists");
    
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.repo.create({ ...data, password: hashedPassword });
  }

  // ✅ Login
  async login(email: string, password: string) {
    const user = await this.repo.login(email);
    if (!user) throw new ApiError(401, "Invalid credentials");
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ApiError(401, "Invalid credentials");
    
    return user;
  }

  // ✅ Get All Users (with pagination and search)
  async getAllUsers(page: number, limit: number, search: string) {
    return this.repo.findAll(page, limit, search);
  }

  // ✅ Get User by ID
  async getUserById(userId: string) {
    const user = await this.repo.findById(userId);
    if (!user) throw new ApiError(404, "User not found");
    return user;
  }

  // ✅ Update User
  async updateUser(userId: string, data: UpdateUserDTO) {
    const user = await this.repo.findById(userId);
    if (!user) throw new ApiError(404, "User not found");
    
    // If email is being changed, check if it's already taken
    if (data.email && data.email !== user.email) {
      const emailExists = await this.repo.findByEmail(data.email);
      if (emailExists) throw new ApiError(409, "Email already in use");
    }
    
    // If password is being changed, hash it
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    
    return this.repo.update(userId, data);
  }

  // ✅ Delete User
  async deleteUser(userId: string) {
    const user = await this.repo.findById(userId);
    if (!user) throw new ApiError(404, "User not found");
    
    return this.repo.delete(userId);
  }

  // ✅ Upload Avatar
  async uploadAvatar(userId: string, path: string) {
    const user = await this.repo.findById(userId);
    if (!user) throw new ApiError(404, "User not found");
    user.avatar = path;
    return user.save();
  }
}