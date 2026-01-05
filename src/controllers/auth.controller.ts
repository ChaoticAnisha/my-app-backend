import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { registerDto, loginDto } from '../dtos/auth.dto';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const parseResult = registerDto.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: parseResult.error.format(),
        });
      }

      const result = await authService.register(parseResult.data);
      return res.status(201).json({
        message: 'User registered successfully',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const parseResult = loginDto.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: parseResult.error.format(),
        });
      }

      const result = await authService.login(parseResult.data);
      return res.status(200).json({
        message: 'Login successful',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
}

export const authController = new AuthController();