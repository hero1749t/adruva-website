import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class CareersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: {
    page?: string;
    limit?: string;
    department?: string;
    status?: string;
    search?: string;
  }) {
    const page = Math.max(1, parseInt(query.page || '1', 10));
    const limit = Math.max(1, parseInt(query.limit || '10', 10));
    const skip = (page - 1) * limit;

    const where: Prisma.WebsiteJobWhereInput = {
      deletedAt: null,
    };

    if (query.department) {
      where.department = query.department;
    }

    if (query.status) {
      if (query.status !== 'all') {
        where.status = query.status;
      }
    } else {
      // Default to active for public views
      where.status = 'active';
    }

    if (query.search) {
      where.title = {
        contains: query.search,
        mode: 'insensitive',
      };
    }

    const [data, total] = await Promise.all([
      this.prisma.websiteJob.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.websiteJob.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  async findOneBySlug(slug: string) {
    const job = await this.prisma.websiteJob.findFirst({
      where: {
        slug,
        deletedAt: null,
      },
    });

    if (!job) {
      throw new NotFoundException(`Job posting with slug "${slug}" not found`);
    }

    return {
      success: true,
      data: job,
    };
  }

  async findOne(id: string) {
    const job = await this.prisma.websiteJob.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!job) {
      throw new NotFoundException(`Job posting with ID "${id}" not found`);
    }

    return {
      success: true,
      data: job,
    };
  }

  async create(dto: CreateJobDto) {
    // Check duplicate slug
    const existing = await this.prisma.websiteJob.findFirst({
      where: {
        slug: dto.slug,
        deletedAt: null,
      },
    });
    if (existing) {
      throw new BadRequestException(
        `A job posting with slug "${dto.slug}" already exists`,
      );
    }

    const deadline = dto.applicationDeadline
      ? new Date(dto.applicationDeadline)
      : null;

    const job = await this.prisma.websiteJob.create({
      data: {
        title: dto.title,
        slug: dto.slug,
        type: dto.type,
        department: dto.department,
        locationType: dto.locationType || null,
        experienceLevel: dto.experienceLevel || null,
        description: dto.description || null,
        responsibilities: dto.responsibilities || [],
        requirements: dto.requirements || [],
        skillsRequired: dto.skillsRequired || [],
        salaryMin: dto.salaryMin || null,
        salaryMax: dto.salaryMax || null,
        salaryLabel: dto.salaryLabel || null,
        isPaid: dto.isPaid !== undefined ? dto.isPaid : true,
        duration: dto.duration || null,
        openingsCount: dto.openingsCount || 1,
        applicationDeadline: deadline,
        processSteps:
          dto.processSteps !== undefined
            ? (dto.processSteps as Prisma.InputJsonValue)
            : undefined,
        perks: dto.perks || [],
        status: dto.status || 'draft',
      },
    });

    return {
      success: true,
      data: job,
    };
  }

  async update(id: string, dto: UpdateJobDto) {
    const job = await this.prisma.websiteJob.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!job) {
      throw new NotFoundException(`Job posting with ID "${id}" not found`);
    }

    if (dto.slug && dto.slug !== job.slug) {
      const existing = await this.prisma.websiteJob.findFirst({
        where: {
          slug: dto.slug,
          deletedAt: null,
        },
      });
      if (existing) {
        throw new BadRequestException(
          `A job posting with slug "${dto.slug}" already exists`,
        );
      }
    }

    const deadline = dto.applicationDeadline
      ? new Date(dto.applicationDeadline)
      : undefined;

    const updatedJob = await this.prisma.websiteJob.update({
      where: { id },
      data: {
        title: dto.title,
        slug: dto.slug,
        type: dto.type,
        department: dto.department,
        locationType: dto.locationType,
        experienceLevel: dto.experienceLevel,
        description: dto.description,
        responsibilities: dto.responsibilities,
        requirements: dto.requirements,
        skillsRequired: dto.skillsRequired,
        salaryMin: dto.salaryMin,
        salaryMax: dto.salaryMax,
        salaryLabel: dto.salaryLabel,
        isPaid: dto.isPaid,
        duration: dto.duration,
        openingsCount: dto.openingsCount,
        applicationDeadline: deadline,
        processSteps:
          dto.processSteps !== undefined
            ? (dto.processSteps as Prisma.InputJsonValue)
            : undefined,
        perks: dto.perks,
        status: dto.status,
      },
    });

    return {
      success: true,
      data: updatedJob,
    };
  }

  async delete(id: string) {
    const job = await this.prisma.websiteJob.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!job) {
      throw new NotFoundException(`Job posting with ID "${id}" not found`);
    }

    await this.prisma.websiteJob.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return {
      success: true,
      message: 'Job posting deleted successfully (soft delete)',
    };
  }
}
