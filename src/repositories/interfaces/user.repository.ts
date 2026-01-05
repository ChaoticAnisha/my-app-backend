import { IUser } from '../../models/user.model';

export interface IUserRepository {
  createUser(data: Pick<IUser, 'email' | 'password' | 'role'>): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
}

