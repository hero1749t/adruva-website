import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { GoogleVerifyDto } from './dto/google-verify.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

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

    const payload = { sub: user.id, email: user.email, role: user.role };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions || [],
        isActive: user.isActive,
      },
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

    const payload = { sub: user.id, email: user.email, role: user.role };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions || [],
        isActive: user.isActive,
      },
    };
  }

  async getAllUsers() {
    return this.prisma.websiteAdminUser.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async createUser(data: {
    name: string;
    email: string;
    role: string;
    permissions: string[];
    password?: string;
  }) {
    let passwordHash = null;
    if (data.password) {
      passwordHash = await bcrypt.hash(data.password, 10);
    }
    return this.prisma.websiteAdminUser.create({
      data: {
        name: data.name,
        email: data.email.toLowerCase().trim(),
        role: data.role,
        permissions: data.permissions,
        passwordHash,
      },
    });
  }

  async updateUser(
    id: string,
    data: { role?: string; permissions?: string[]; isActive?: boolean },
  ) {
    return this.prisma.websiteAdminUser.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: string) {
    return this.prisma.websiteAdminUser.delete({
      where: { id },
    });
  }
}
