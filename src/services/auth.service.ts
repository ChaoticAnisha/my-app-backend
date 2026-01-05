import { userRepository } from '../repositories/user.repository';
import { RegisterDto, LoginDto } from '../dtos/auth.dto';
import { hashPassword, comparePassword } from '../utils/hash';
import { signToken } from '../utils/jwt';
import { HttpError } from '../errors/http.error';

export class AuthService {
  async register(payload: RegisterDto) {
    const existing = await userRepository.findByEmail(payload.email);
    if (existing) {
      throw new HttpError('Email already in use', 400);
    }

    const hashed = await hashPassword(payload.password);
    const role = payload.role || 'user';

    try {
      const user = await userRepository.createUser({
        email: payload.email,
        password: hashed,
        role,
      });

      const userId = user._id.toString();
      const token = signToken({ userId, email: user.email, role: user.role });

      return {
        user: {
          id: userId,
          email: user.email,
          role: user.role,
        },
        token,
      };
    } catch (err: any) {
      // Handle MongoDB duplicate key error (race condition)
      if (err.code === 11000 || err.name === 'MongoServerError') {
        throw new HttpError('Email already in use', 400);
      }
      throw err;
    }
  }

  async login(payload: LoginDto) {
    const user = await userRepository.findByEmail(payload.email);
    if (!user) {
      throw new HttpError('Invalid credentials', 401);
    }

    const isMatch = await comparePassword(payload.password, user.password);
    if (!isMatch) {
      throw new HttpError('Invalid credentials', 401);
    }

    const userId = user._id.toString();
    const token = signToken({ userId, email: user.email, role: user.role });

    return {
      user: {
        id: userId,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }
}

export const authService = new AuthService();