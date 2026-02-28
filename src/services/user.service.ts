import bcrypt from "bcrypt";
import crypto from "crypto";
import { UserRepository } from "../repositories/user.repository";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/user.dto";
import { ApiError } from "../errors/ApiError";
import { EmailService } from "./email.service";
import { UserModel } from "../models/user.model";

export class UserService {
  private repo = new UserRepository();

  // Create User
  async createUser(data: CreateUserDTO) {
    const exists = await this.repo.findByEmail(data.email);
    if (exists) throw new ApiError(409, "User already exists");
    
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.repo.create({ ...data, password: hashedPassword });
  }

  // Login
  async login(email: string, password: string) {
    const user = await this.repo.login(email);
    if (!user) throw new ApiError(401, "Invalid credentials");
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ApiError(401, "Invalid credentials");
    
    return user;
  }

  // Get All Users (with pagination and search)
  async getAllUsers(page: number, limit: number, search: string) {
    return this.repo.findAll(page, limit, search);
  }

  // Get User by ID
  async getUserById(userId: string) {
    const user = await this.repo.findById(userId);
    if (!user) throw new ApiError(404, "User not found");
    return user;
  }

  // Update User
  async updateUser(userId: string, data: UpdateUserDTO) {
    const user = await this.repo.findById(userId);
    if (!user) throw new ApiError(404, "User not found");
    
    // If email is being changed, check if it's already taken
    if (data.email && data.email !== user.email) {
      const emailExists = await this.repo.findByEmail(data.email);
      if (emailExists) throw new ApiError(409, "Email already in use");
    }
    
    // If password is being changed, hash it
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    
    return this.repo.update(userId, data);
  }

  // Delete User
  async deleteUser(userId: string) {
    const user = await this.repo.findById(userId);
    if (!user) throw new ApiError(404, "User not found");
    
    return this.repo.delete(userId);
  }

  // Upload Avatar
  async uploadAvatar(userId: string, avatarPath: string) {
    const user = await this.repo.update(userId, { avatar: avatarPath } as any);
    if (!user) throw new ApiError(404, "User not found");
    return user;
  }

  // Forgot Password
  async forgotPassword(email: string) {
    const user = await this.repo.findByEmail(email);
    if (!user) {
      // Don't reveal if email exists (security best practice)
      return { message: "If email exists, reset link has been sent" };
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set token and expiry (1 hour)
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    // Send email
    const emailService = new EmailService();
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
    
    try {
      await emailService.sendPasswordResetEmail(user.email, resetToken, resetUrl);
    } catch (error) {
      console.error('Error sending email:', error);
      // Reset the token fields if email fails
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
      throw new ApiError(500, "Failed to send password reset email");
    }

    return { message: "Password reset email sent" };
  }

  // ✅ Reset Password
  async resetPassword(token: string, newPassword: string) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await UserModel.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new ApiError(400, "Invalid or expired reset token");
    }

    // Update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return { message: "Password reset successful" };
  }
}