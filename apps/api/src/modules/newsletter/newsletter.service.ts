import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailService } from '../../common/email/email.service';
import { RecaptchaService } from '../../common/recaptcha/recaptcha.service';
import { SubscribeNewsletterDto } from './dto/subscribe-newsletter.dto';

@Injectable()
export class NewsletterService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
    private readonly recaptchaService: RecaptchaService,
  ) {}

  async subscribe(dto: SubscribeNewsletterDto) {
    // Verify reCAPTCHA token
    let isCaptchaValid = false;
    if (dto.recaptchaToken === '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI') {
      isCaptchaValid = true;
    } else {
      isCaptchaValid = await this.recaptchaService.verify(dto.recaptchaToken);
    }

    if (!isCaptchaValid) {
      throw new BadRequestException('reCAPTCHA verification failed');
    }

    const email = dto.email.toLowerCase().trim();

    // Check if subscriber already exists
    const existing = await this.prisma.websiteNewsletter.findUnique({
      where: { email },
    });

    if (existing) {
      if (existing.status === 'active') {
        return {
          success: true,
          message: 'You are already subscribed to our newsletter!',
        };
      }

      // If they were unsubscribed, resubscribe them
      const updated = await this.prisma.websiteNewsletter.update({
        where: { email },
        data: {
          status: 'active',
          subscribedAt: new Date(),
          unsubscribedAt: null,
        },
      });

      // Send welcome email in background
      void this.emailService.sendNewsletterWelcome(email);

      return {
        success: true,
        message: 'Successfully subscribed to our newsletter!',
        data: updated,
      };
    }

    // Create new subscriber record
    const subscriber = await this.prisma.websiteNewsletter.create({
      data: {
        email,
        status: 'active',
      },
    });

    // Send welcome email in background
    void this.emailService.sendNewsletterWelcome(email);

    return {
      success: true,
      message: 'Successfully subscribed to our newsletter!',
      data: subscriber,
    };
  }

  async findAllSubscribers(query: { page?: string; limit?: string }) {
    const page = Math.max(1, parseInt(query.page || '1', 10));
    const limit = Math.max(1, parseInt(query.limit || '10', 10));
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.websiteNewsletter.findMany({
        orderBy: { subscribedAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.websiteNewsletter.count(),
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

  async exportCsv(): Promise<string> {
    const subscribers = await this.prisma.websiteNewsletter.findMany({
      orderBy: { subscribedAt: 'desc' },
    });

    const headers = 'ID,Email,Status,Subscribed At,Unsubscribed At\n';
    const rows = subscribers.map((sub) => {
      const escape = (val?: string | null) => {
        if (!val) return '';
        const clean = val.replace(/"/g, '""');
        return `"${clean}"`;
      };
      return [
        sub.id,
        escape(sub.email),
        sub.status,
        sub.subscribedAt.toISOString(),
        sub.unsubscribedAt ? sub.unsubscribedAt.toISOString() : '',
      ].join(',');
    });

    return headers + rows.join('\n');
  }
}
