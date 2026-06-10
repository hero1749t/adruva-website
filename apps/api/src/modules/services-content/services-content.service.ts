import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ServicesContentService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const data = await this.prisma.websiteService.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        sortOrder: 'asc',
      },
    });

    return {
      success: true,
      data,
    };
  }

  async findOneBySlug(slug: string) {
    const service = await this.prisma.websiteService.findUnique({
      where: { slug },
    });

    if (!service) {
      throw new NotFoundException(`Service with slug "${slug}" not found`);
    }

    return {
      success: true,
      data: service,
    };
  }

  async findOne(id: string) {
    const service = await this.prisma.websiteService.findUnique({
      where: { id },
    });

    if (!service) {
      throw new NotFoundException(`Service with ID "${id}" not found`);
    }

    return {
      success: true,
      data: service,
    };
  }

  async update(id: string, dto: UpdateServiceDto) {
    const service = await this.prisma.websiteService.findUnique({
      where: { id },
    });

    if (!service) {
      throw new NotFoundException(`Service with ID "${id}" not found`);
    }

    const updatedService = await this.prisma.websiteService.update({
      where: { id },
      data: {
        name: dto.name,
        category: dto.category,
        tagline: dto.tagline,
        description: dto.description,
        benefits:
          dto.benefits !== undefined
            ? (dto.benefits as Prisma.InputJsonValue)
            : undefined,
        whatsIncluded: dto.whatsIncluded,
        processSteps:
          dto.processSteps !== undefined
            ? (dto.processSteps as Prisma.InputJsonValue)
            : undefined,
        techStack: dto.techStack,
        startingPrice: dto.startingPrice,
        faq:
          dto.faq !== undefined
            ? (dto.faq as Prisma.InputJsonValue)
            : undefined,
        metaTitle: dto.metaTitle,
        metaDescription: dto.metaDescription,
        ogImageUrl: dto.ogImageUrl,
        isActive: dto.isActive,
        sortOrder: dto.sortOrder,
      },
    });

    return {
      success: true,
      data: updatedService,
    };
  }
}
