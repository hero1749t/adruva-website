import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { GoogleVerifyDto } from './dto/google-verify.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('google-verify')
  @HttpCode(HttpStatus.OK)
  async verifyGoogle(@Body() dto: GoogleVerifyDto) {
    return this.authService.verifyGoogle(dto);
  }
}
