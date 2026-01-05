import jwt, { type SignOptions } from 'jsonwebtoken';
import { ENV } from '../config/env';

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export const signToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, ENV.JWT_SECRET, {
    expiresIn: ENV.JWT_EXPIRES_IN,
  } as SignOptions);
};