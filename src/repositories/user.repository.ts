import { UserModel } from "../models/user.model";
import { CreateUserDTO } from "../dtos/user.dto";

export class UserRepository {
  create(data: CreateUserDTO) {
    return UserModel.create(data);
  }

  findByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  findById(id: string) {
    return UserModel.findById(id);
  }

  // 🔑 New: login helper
  async login(email: string) {
    return UserModel.findOne({ email });
  }
}
