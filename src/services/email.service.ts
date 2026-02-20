import nodemailer from 'nodemailer';

export class EmailService {
  private transporter;

  constructor() {
    console.log('📧 Initializing Email Service...');
    console.log('SMTP_HOST:', process.env.SMTP_HOST || 'smtp.ethereal.email');
    
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER || 'ethereal.user@ethereal.email',
        pass: process.env.SMTP_PASS || 'ethereal.pass',
      },
    });
  }

  async sendPasswordResetEmail(email: string, resetToken: string, resetUrl: string) {
    console.log('📧 Sending password reset email to:', email);
    console.log('🔗 Reset URL:', resetUrl);
    
    const mailOptions = {
      from: process.env.SMTP_FROM || 'QuickCart <noreply@quickcart.com>',
      to: email,
      subject: 'Password Reset Request - QuickCart',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FFA500;">Password Reset Request</h2>
          <p>You requested to reset your password for QuickCart.</p>
          <p>Click the button below to reset your password:</p>
          <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(to right, #FFD700, #FFA500); color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">
            Reset Password
          </a>
          <p style="margin-top: 20px; color: #666;">Or copy this link:</p>
          <p style="color: #666; word-break: break-all;">${resetUrl}</p>
          <p style="margin-top: 20px; color: #666; font-size: 14px;">
            This link will expire in 1 hour. If you didn't request this, please ignore this email.
          </p>
          <p style="margin-top: 20px; color: #666; font-size: 14px;">
            Reset Token: <code>${resetToken}</code>
          </p>
        </div>
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully!');
      console.log('📬 Message ID:', info.messageId);
      
      // For Ethereal, get preview URL
      const previewUrl = nodemailer.getTestMessageUrl(info);
      if (previewUrl) {
        console.log('👁️  Preview URL:', previewUrl);
      }
      
      return info;
    } catch (error: any) {
      console.error('❌ Email error:', error.message);
      console.error('Stack:', error.stack);
      throw new Error('Failed to send password reset email');
    }
  }
}