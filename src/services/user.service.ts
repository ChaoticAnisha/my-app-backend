import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user.repository";
import { CreateUserDTO } from "../dtos/user.dto";
import { ApiError } from "../errors/ApiError";

export class UserService {
  private repo = new UserRepository();

  async createUser(data: CreateUserDTO) {
    const exists = await this.repo.findByEmail(data.email);
    if (exists) throw new ApiError(409, "User already exists");

    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.repo.create({ ...data, password: hashedPassword });
  }

  async uploadAvatar(userId: string, path: string) {
    const user = await this.repo.findById(userId);
    if (!user) throw new ApiError(404, "User not found");

    user.avatar = path;
    return user.save();
  }

  // 🔑 New: login
  async login(email: string, password: string) {
    const user = await this.repo.login(email);
    if (!user) throw new ApiError(401, "Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ApiError(401, "Invalid credentials");

    return user;
  }
}
