import { UserModel, UserDocument } from "../models/user.model";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/user.dto";

export class UserRepository {
  // Create User
  async create(data: CreateUserDTO): Promise<UserDocument> {
    return UserModel.create(data);
  }

  // Find by Email
  async findByEmail(email: string): Promise<UserDocument | null> {
    return UserModel.findOne({ email });
  }

  // Find by ID
  async findById(id: string): Promise<UserDocument | null> {
    return UserModel.findById(id);
  }

  // Login (Find by Email)
  async login(email: string): Promise<UserDocument | null> {
    return UserModel.findOne({ email });
  }

  // Get All Users (with pagination and search)
  async findAll(page: number, limit: number, search: string) {
    const skip = (page - 1) * limit;
    
    // Build search query
    const searchQuery = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { phone: { $regex: search, $options: 'i' } },
            { address: { $regex: search, $options: 'i' } }
          ]
        }
      : {};
    
    const users = await UserModel
      .find(searchQuery)
      .select('-password') // Don't return password
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Newest first
    
    const total = await UserModel.countDocuments(searchQuery);
    
    return { users, total };
  }

  // ✅ Update User
  async update(id: string, data: UpdateUserDTO): Promise<UserDocument | null> {
    return UserModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );
  }

  // ✅ Delete User
  async delete(id: string): Promise<UserDocument | null> {
    return UserModel.findByIdAndDelete(id);
  }
}