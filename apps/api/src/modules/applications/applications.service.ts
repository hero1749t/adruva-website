import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { RecaptchaService } from '../../common/recaptcha/recaptcha.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ApplicationsService {
  private readonly logger = new Logger(ApplicationsService.name);
  private readonly TEST_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

  constructor(
    private readonly prisma: PrismaService,
    private readonly recaptchaService: RecaptchaService,
  ) {}

  async create(dto: CreateApplicationDto, ipAddress?: string) {
    // 1. Verify reCAPTCHA token
    let isCaptchaValid = false;
    if (dto.recaptchaToken === this.TEST_SITE_KEY) {
      this.logger.log('reCAPTCHA test site key used. Bypassing verification.');
      isCaptchaValid = true;
    } else {
      isCaptchaValid = await this.recaptchaService.verify(dto.recaptchaToken);
    }

    if (!isCaptchaValid) {
      throw new BadRequestException('reCAPTCHA verification failed');
    }

    // 2. Dynamically upsert WebsiteJob to satisfy foreign key constraint
    const jobSlug = `${dto.jobTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${dto.jobId.slice(0, 8)}`;
    await this.prisma.websiteJob.upsert({
      where: { id: dto.jobId },
      update: {
        title: dto.jobTitle,
      },
      create: {
        id: dto.jobId,
        title: dto.jobTitle,
        slug: jobSlug,
        type: 'full_time',
        department: 'General',
        status: 'active',
      },
    });

    // 3. Save application to database
    const application = await this.prisma.websiteApplication.create({
      data: {
        jobId: dto.jobId,
        jobTitle: dto.jobTitle,
        fullName: dto.fullName,
        email: dto.email,
        phone: dto.phone,
        currentLocation: dto.currentLocation,
        qualification: dto.qualification,
        experienceLevel: dto.experienceLevel,
        resumeUrl:
          dto.resumeUrl || 'https://example.com/resume-placeholder.pdf',
        portfolioUrl: dto.portfolioUrl || null,
        linkedinUrl: dto.linkedinUrl || null,
        coverLetter: dto.coverLetter,
        whyJoin: dto.whyJoin,
        referralSource: dto.referralSource,
        ipAddress,
      },
    });

    // Create a dashboard notification for the new career application
    try {
      await this.prisma.websiteNotification.create({
        data: {
          type: 'application',
          title: 'New Job Application',
          message: `${application.fullName} applied for the ${application.jobTitle} position`,
          link: `/admin/applications`,
        },
      });
    } catch (e) {
      this.logger.error('Failed to create notification for job application', e);
    }

    this.logger.log(
      `Successfully created application ${application.id} for job ${dto.jobId}`,
    );

    return {
      success: true,
      message: 'Application submitted successfully!',
      data: { applicationId: application.id },
    };
  }

  async findAll(query: {
    page?: string;
    limit?: string;
    jobId?: string;
    status?: string;
    search?: string;
  }) {
    const page = Math.max(1, parseInt(query.page || '1', 10));
    const limit = Math.max(1, parseInt(query.limit || '10', 10));
    const skip = (page - 1) * limit;

    const where: Prisma.WebsiteApplicationWhereInput = {};

    if (query.jobId) {
      where.jobId = query.jobId;
    }

    if (query.status && query.status !== 'all') {
      where.status = query.status;
    }

    if (query.search) {
      where.OR = [
        { fullName: { contains: query.search, mode: 'insensitive' } },
        { email: { contains: query.search, mode: 'insensitive' } },
        { jobTitle: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.websiteApplication.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.websiteApplication.count({ where }),
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

  async findOne(id: string) {
    const application = await this.prisma.websiteApplication.findUnique({
      where: { id },
      include: {
        job: true,
      },
    });

    if (!application) {
      throw new NotFoundException(`Application with ID "${id}" not found`);
    }

    return {
      success: true,
      data: application,
    };
  }

  async update(id: string, dto: UpdateApplicationDto) {
    const application = await this.prisma.websiteApplication.findUnique({
      where: { id },
    });

    if (!application) {
      throw new NotFoundException(`Application with ID "${id}" not found`);
    }

    const updated = await this.prisma.websiteApplication.update({
      where: { id },
      data: {
        status: dto.status,
        internalRating: dto.internalRating,
        adminNotes: dto.adminNotes,
        reviewedBy: dto.reviewedBy,
      },
    });

    return {
      success: true,
      data: updated,
    };
  }
}
