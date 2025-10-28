import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body) {
    const { name, email, password } = body;
    return this.authService.register(name, email, password);
  }

  @Post('login')
  async login(@Body() body) {
    const { email, password } = body;
    return this.authService.login(email, password);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() body) {
    const { email, otp } = body;
    return this.authService.verifyOtpCheck(email, otp);
  }

  @Post('verify-account')
  async verifyAccount(@Body('email') email: string) {
    return await this.authService.verifyAccount(email);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body) {
    const { email } = body;
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  async resetPassword(@Body() body) {
    const { email, newPassword } = body;
    return this.authService.resetPassword(email, newPassword);
  }
}
