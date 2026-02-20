import { z } from "zod";

export const ForgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const ResetPasswordSchema = z.object({
  token: z.string().min(1, "Reset token is required"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

export type ForgotPasswordDTO = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordDTO = z.infer<typeof ResetPasswordSchema>;