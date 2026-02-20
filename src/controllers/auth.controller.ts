import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { ForgotPasswordSchema, ResetPasswordSchema } from "../dtos/auth.dto";

const service = new UserService();

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('🔐 Forgot password request received');
    console.log('Body:', req.body);
    
    const parsed = ForgotPasswordSchema.parse(req.body);
    console.log('✅ Validation passed for email:', parsed.email);
    
    const result = await service.forgotPassword(parsed.email);
    
    res.json({
      success: true,
      message: result.message,
    });
  } catch (err: any) {
    console.error('❌ Forgot password error:', err.message);
    next(err);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('🔐 Reset password request received');
    console.log('Body:', req.body);
    
    const parsed = ResetPasswordSchema.parse(req.body);
    console.log('✅ Validation passed');
    
    const result = await service.resetPassword(parsed.token, parsed.newPassword);
    
    res.json({
      success: true,
      message: result.message,
    });
  } catch (err: any) {
    console.error('❌ Reset password error:', err.message);
    next(err);
  }
};