import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { GoogleVerifyDto } from './dto/google-verify.dto';
import { Permissions } from '../../common/decorators/permissions.decorator';

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

  @Get('users')
  @Permissions('owner')
  async getAllUsers() {
    const users = await this.authService.getAllUsers();
    return {
      success: true,
      data: users,
    };
  }

  @Post('users')
  @Permissions('owner')
  async createUser(
    @Body()
    dto: {
      name: string;
      email: string;
      role: string;
      permissions: string[];
      password?: string;
    },
  ) {
    const user = await this.authService.createUser(dto);
    return {
      success: true,
      data: user,
    };
  }

  @Patch('users/:id')
  @Permissions('owner')
  async updateUser(
    @Param('id') id: string,
    @Body()
    dto: { role?: string; permissions?: string[]; isActive?: boolean },
  ) {
    const user = await this.authService.updateUser(id, dto);
    return {
      success: true,
      data: user,
    };
  }

  @Delete('users/:id')
  @Permissions('owner')
  async deleteUser(@Param('id') id: string) {
    await this.authService.deleteUser(id);
    return {
      success: true,
      message: 'User deleted successfully',
    };
  }
}
