import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: {
    category?: string;
    industry?: string;
    status?: string;
    isFeatured?: string;
  }) {
    const where: Prisma.WebsiteProjectWhereInput = {
      deletedAt: null,
    };

    if (query.category) {
      where.category = query.category;
    }

    if (query.industry) {
      where.industry = query.industry;
    }

    if (query.status) {
      if (query.status !== 'all') {
        where.status = query.status;
      }
    } else {
      // Default to published for public queries
      where.status = 'published';
    }

    if (query.isFeatured !== undefined) {
      where.isFeatured = query.isFeatured === 'true';
    }

    const data = await this.prisma.websiteProject.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return {
      success: true,
      data,
    };
  }

  async findFeatured() {
    const data = await this.prisma.websiteProject.findMany({
      where: {
        isFeatured: true,
        status: 'published',
        deletedAt: null,
      },
      orderBy: { createdAt: 'desc' },
      take: 3,
    });

    return {
      success: true,
      data,
    };
  }

  async findOneBySlug(slug: string) {
    const project = await this.prisma.websiteProject.findFirst({
      where: {
        slug,
        deletedAt: null,
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with slug "${slug}" not found`);
    }

    return {
      success: true,
      data: project,
    };
  }

  async findOne(id: string) {
    const project = await this.prisma.websiteProject.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }

    return {
      success: true,
      data: project,
    };
  }

  async create(dto: CreateProjectDto) {
    // Check for duplicate slug
    const existing = await this.prisma.websiteProject.findFirst({
      where: {
        slug: dto.slug,
        deletedAt: null,
      },
    });
    if (existing) {
      throw new BadRequestException(
        `A project with slug "${dto.slug}" already exists`,
      );
    }

    const project = await this.prisma.websiteProject.create({
      data: {
        title: dto.title,
        slug: dto.slug,
        clientName: dto.clientName,
        industry: dto.industry,
        category: dto.category,
        techStack: dto.techStack || [],
        heroImageUrl: dto.heroImageUrl,
        heroImageCloudinaryId: dto.heroImageCloudinaryId,
        galleryImages:
          dto.galleryImages !== undefined
            ? (dto.galleryImages as Prisma.InputJsonValue)
            : undefined,
        problem: dto.problem,
        solution: dto.solution,
        results: dto.results,
        isFeatured: dto.isFeatured || false,
        metaTitle: dto.metaTitle,
        metaDescription: dto.metaDescription,
        ogImageUrl: dto.ogImageUrl,
        status: dto.status || 'draft',
      },
    });

    return {
      success: true,
      data: project,
    };
  }

  async update(id: string, dto: UpdateProjectDto) {
    const project = await this.prisma.websiteProject.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }

    // Check duplicate slug if slug is being changed
    if (dto.slug && dto.slug !== project.slug) {
      const existing = await this.prisma.websiteProject.findFirst({
        where: {
          slug: dto.slug,
          deletedAt: null,
        },
      });
      if (existing) {
        throw new BadRequestException(
          `A project with slug "${dto.slug}" already exists`,
        );
      }
    }

    const updatedProject = await this.prisma.websiteProject.update({
      where: { id },
      data: {
        title: dto.title,
        slug: dto.slug,
        clientName: dto.clientName,
        industry: dto.industry,
        category: dto.category,
        techStack: dto.techStack,
        heroImageUrl: dto.heroImageUrl,
        heroImageCloudinaryId: dto.heroImageCloudinaryId,
        galleryImages:
          dto.galleryImages !== undefined
            ? (dto.galleryImages as Prisma.InputJsonValue)
            : undefined,
        problem: dto.problem,
        solution: dto.solution,
        results: dto.results,
        isFeatured: dto.isFeatured,
        metaTitle: dto.metaTitle,
        metaDescription: dto.metaDescription,
        ogImageUrl: dto.ogImageUrl,
        status: dto.status,
      },
    });

    return {
      success: true,
      data: updatedProject,
    };
  }

  async delete(id: string) {
    const project = await this.prisma.websiteProject.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }

    await this.prisma.websiteProject.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return {
      success: true,
      message: 'Project deleted successfully (soft delete)',
    };
  }

  async toggleFeatured(id: string) {
    const project = await this.prisma.websiteProject.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }

    const updatedProject = await this.prisma.websiteProject.update({
      where: { id },
      data: {
        isFeatured: !project.isFeatured,
      },
    });

    return {
      success: true,
      data: updatedProject,
    };
  }
}
