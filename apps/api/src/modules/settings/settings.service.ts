import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const settings = await this.prisma.websiteSetting.findMany();
    const result: Record<string, string> = {};
    for (const setting of settings) {
      result[setting.key] = setting.value;
    }
    return {
      success: true,
      data: result,
    };
  }

  async updateBulk(settings: Record<string, string>) {
    const upserts = Object.entries(settings).map(([key, value]) =>
      this.prisma.websiteSetting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      }),
    );
    await this.prisma.$transaction(upserts);
    return {
      success: true,
      message: 'Settings updated successfully!',
    };
  }
}
