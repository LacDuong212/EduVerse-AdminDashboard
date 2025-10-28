import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from '../schemas/admin.schema';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { transporter } from '../configs/mailer.config';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>) {}

  async register(name: string, email: string, password: string) {
    if (!name || !email || !password) {
      return { success: false, message: 'All fields are required' };
    }

    const existingAdmin = await this.adminModel.findOne({ email });
    if (existingAdmin) {
      return { success: false, message: 'Admin already exists' };
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const admin = new this.adminModel({
      name,
      email,
      password: hashPassword,
      verifyOtp: otp,
      verifyOtpExpireAt: Date.now() + 10 * 60 * 1000,
    });
    await admin.save();

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: admin.email,
      subject: 'Your verification OTP for EduVerse',
      text: `Hello ${admin.name},\n\nYour OTP is: ${otp}\nValid for 10 minutes.\n`,
    });

    return {
      success: true,
      message: 'Registration successful. Please verify your email with OTP.',
      token,
    };
  }

  async login(email: string, password: string) {
    if (!email || !password) {
      return { success: false, message: 'Email and password are required' };
    }

    const admin = await this.adminModel.findOne({ email });
    if (!admin) return { success: false, message: 'Invalid email' };

    if (!admin.isVerified) {
      return { success: false, needVerify: true, message: 'Please verify your email first' };
    }

    if (!admin.isApproved) {
      return { success: false, needVerify: true, message: 'Your account has not been approved yet.' };
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return { success: false, message: 'Invalid password' };

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });

    return {
      success: true,
      message: 'Login successful',
      token,
      user: { id: admin._id, name: admin.name, email: admin.email },
    };
  }

  async verifyOtpCheck(email: string, otp: string) {
    const admin = await this.adminModel.findOne({ email });
    if (!admin) return { success: false, message: 'Account not found' };

    if (admin.verifyOtp === '' || admin.verifyOtp !== otp) {
      return { success: false, message: 'Invalid OTP' };
    }

    if (admin.verifyOtpExpireAt && Date.now() > admin.verifyOtpExpireAt) {
      return { success: false, message: 'OTP has expired' };
    }

    admin.verifyOtp = '';
    admin.verifyOtpExpireAt = 0;

    await admin.save();

    return { success: true, message: 'Email verified successfully' };
  }

  async verifyAccount(email: string) {
    if (!email) {
        return { success: false, message: 'Missing email' };
    }

    const admin = await this.adminModel.findOne({ email });
    if (!admin) {
        return { success: false, message: 'Admin not found' };
    }

    if (admin.isVerified) {
        return { success: false, message: 'Account already verified' };
    }

    admin.isVerified = true;
    await admin.save();

    return { success: true, message: 'Account verified successfully' };
    }

  async forgotPassword(email: string) {
    const admin = await this.adminModel.findOne({ email });
    if (!admin) return { success: false, message: 'Account not found' };
    if (!admin.isVerified) return { success: false, message: 'Account not verified' };

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    admin.verifyOtp = otp;
    admin.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000;
    await admin.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: admin.email,
      subject: 'Password Reset OTP',
      text: `Hello ${admin.name},\n\nYour account recovery OTP is: ${otp}\nValid for 10 minutes.`,
    });

    return { success: true, message: 'New OTP sent to your email' };
  }

  async resetPassword(email: string, newPassword: string) {
    const admin = await this.adminModel.findOne({ email });
    if (!admin) return { success: false, message: 'Account not found' };
    if (!admin.isVerified) return { success: false, message: 'Account not verified' };

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedNewPassword;
    await admin.save();

    return { success: true, message: 'Password reset successfully' };
  }
}
