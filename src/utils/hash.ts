import bcrypt from 'bcrypt';
import { ENV } from '../config/env';

// Hash a plain text password
export const hashPassword = async (plain: string): Promise<string> => {
  const salt = await bcrypt.genSalt(ENV.BCRYPT_SALT_ROUNDS);
  return bcrypt.hash(plain, salt);
};
export const comparePassword = async (plain: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(plain, hash);
};
