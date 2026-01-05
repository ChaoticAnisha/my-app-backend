import { UserModel, IUser } from '../models/user.model';
import { IUserRepository } from './interfaces/user.repository';

export class UserRepository implements IUserRepository {
  async createUser(data: Pick<IUser, 'email' | 'password' | 'role'>): Promise<IUser> {
    const user = new UserModel(data);
    return user.save();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email });
  }

  async findById(id: string): Promise<IUser | null> {
    return UserModel.findById(id);
  }
}

export const userRepository = new UserRepository();
