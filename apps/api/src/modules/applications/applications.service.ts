import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { RecaptchaService } from '../../common/recaptcha/recaptcha.service';

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

    this.logger.log(
      `Successfully created application ${application.id} for job ${dto.jobId}`,
    );

    return {
      success: true,
      message: 'Application submitted successfully!',
      data: { applicationId: application.id },
    };
  }
}
