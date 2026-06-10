import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { GoogleVerifyDto } from './dto/google-verify.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login(dto: LoginDto) {
    const email = dto.email.toLowerCase().trim();

    const user = await this.prisma.websiteAdminUser.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Your account has been deactivated');
    }

    if (!user.passwordHash) {
      throw new UnauthorizedException(
        'Password not configured for this account. Try signing in with Google.',
      );
    }

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Update last login timestamp in background
    void this.prisma.websiteAdminUser.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    };
  }

  async verifyGoogle(dto: GoogleVerifyDto) {
    const email = dto.email.toLowerCase().trim();

    const user = await this.prisma.websiteAdminUser.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException(
        'This Google account is not authorized to access the Admin Panel',
      );
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Your account has been deactivated');
    }

    // Update last login timestamp in background
    void this.prisma.websiteAdminUser.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    };
  }
}
