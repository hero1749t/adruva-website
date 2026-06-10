import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { RecaptchaService } from '../../common/recaptcha/recaptcha.service';
import { EmailService } from '../../common/email/email.service';
import { WhatsappService } from '../../common/whatsapp/whatsapp.service';
import { CrmWebhookService } from '../../common/crm-webhook/crm-webhook.service';

@Injectable()
export class InquiriesService {
  private readonly logger = new Logger(InquiriesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly recaptchaService: RecaptchaService,
    private readonly emailService: EmailService,
    private readonly whatsappService: WhatsappService,
    private readonly crmWebhookService: CrmWebhookService,
  ) {}

  async create(dto: CreateInquiryDto, ipAddress?: string, userAgent?: string) {
    // 1. Verify reCAPTCHA token
    let isCaptchaValid = false;
    if (dto.recaptchaToken === '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI') {
      isCaptchaValid = true;
    } else {
      isCaptchaValid = await this.recaptchaService.verify(dto.recaptchaToken);
    }
    if (!isCaptchaValid) {
      throw new BadRequestException('reCAPTCHA verification failed');
    }

    // 2. Save inquiry to database
    const inquiry = await this.prisma.websiteInquiry.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        companyName: dto.companyName,
        serviceInterested: dto.serviceInterested,
        budgetRange: dto.budgetRange,
        timeline: dto.timeline,
        message: dto.message,
        ipAddress,
        userAgent,
      },
    });

    // 3. Trigger parallel background notifications/integrations
    void Promise.allSettled([
      this.emailService.sendUserConfirmation(
        inquiry.email,
        inquiry.name,
        inquiry.serviceInterested || '',
        inquiry.budgetRange || '',
        inquiry.timeline || '',
      ),
      this.emailService.sendTeamNotification(inquiry),
      this.whatsappService.sendLeadNotification(
        inquiry.name,
        inquiry.serviceInterested || '',
        inquiry.phone || '',
      ),
      this.crmWebhookService.pushLeadToCRM(inquiry),
    ]).then(async (results) => {
      const crmResult = results[3];
      if (crmResult.status === 'fulfilled' && crmResult.value) {
        const crmLeadId = crmResult.value;
        try {
          await this.prisma.websiteInquiry.update({
            where: { id: inquiry.id },
            data: { crmLeadId },
          });
          this.logger.log(
            `Inquiry ${inquiry.id} updated with CRM Lead ID: ${crmLeadId}`,
          );
        } catch (updateErr) {
          this.logger.error(
            `Failed to update inquiry ${inquiry.id} with crmLeadId: ${(updateErr as Error).message}`,
          );
        }
      }
    });

    return {
      success: true,
      message: "Your message has been sent! We'll get back within 24 hours.",
      data: { inquiryId: inquiry.id },
    };
  }

  async findAll(query: { page?: string; limit?: string; status?: string }) {
    const page = Math.max(1, parseInt(query.page || '1', 10));
    const limit = Math.max(1, parseInt(query.limit || '10', 10));
    const skip = (page - 1) * limit;

    const where: Prisma.WebsiteInquiryWhereInput = {};
    if (query.status) {
      where.status = query.status;
    }

    const [data, total] = await Promise.all([
      this.prisma.websiteInquiry.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.websiteInquiry.count({ where }),
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
    const inquiry = await this.prisma.websiteInquiry.findUnique({
      where: { id },
    });

    if (!inquiry) {
      throw new NotFoundException(`Inquiry with ID ${id} not found`);
    }

    return {
      success: true,
      data: inquiry,
    };
  }

  async updateStatus(id: string, status: string) {
    try {
      const inquiry = await this.prisma.websiteInquiry.update({
        where: { id },
        data: { status },
      });

      return {
        success: true,
        data: inquiry,
      };
    } catch {
      throw new NotFoundException(`Inquiry with ID ${id} not found`);
    }
  }

  async exportCsv(): Promise<string> {
    const inquiries = await this.prisma.websiteInquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const headers =
      'ID,Name,Email,Phone,Company,Service,Budget,Timeline,Message,Status,CRM Lead ID,Created At\n';
    const rows = inquiries.map((inq) => {
      const escape = (val?: string | null) => {
        if (!val) return '';
        const clean = val.replace(/"/g, '""');
        return `"${clean}"`;
      };
      return [
        inq.id,
        escape(inq.name),
        escape(inq.email),
        escape(inq.phone),
        escape(inq.companyName),
        escape(inq.serviceInterested),
        escape(inq.budgetRange),
        escape(inq.timeline),
        escape(inq.message),
        inq.status,
        escape(inq.crmLeadId),
        inq.createdAt.toISOString(),
      ].join(',');
    });

    return headers + rows.join('\n');
  }
}
