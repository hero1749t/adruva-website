import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly prisma: PrismaService) {}

  private async getTransporter(): Promise<{
    transporter: nodemailer.Transporter | null;
    sender: string;
  }> {
    try {
      const dbSettings = await this.prisma.websiteSetting.findMany({
        where: {
          key: {
            in: [
              'smtpHost',
              'smtpPort',
              'smtpUser',
              'smtpPassword',
              'senderEmail',
            ],
          },
        },
      });

      const settingsMap = dbSettings.reduce(
        (acc, curr) => {
          acc[curr.key] = curr.value;
          return acc;
        },
        {} as Record<string, string>,
      );

      const user = settingsMap.smtpUser || process.env.GMAIL_USER;
      const pass = settingsMap.smtpPassword || process.env.GMAIL_APP_PASSWORD;
      const host = settingsMap.smtpHost;
      const port = settingsMap.smtpPort
        ? parseInt(settingsMap.smtpPort, 10)
        : 587;
      const sender =
        settingsMap.senderEmail || user || 'hello@adruvaSolution.com';

      if (user && pass) {
        if (host && host !== 'smtp.gmail.com') {
          // Custom SMTP Server
          const transporter = nodemailer.createTransport({
            host,
            port,
            secure: port === 465,
            auth: { user, pass },
          });
          return { transporter, sender };
        } else {
          // Gmail Default
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user, pass },
          });
          return { transporter, sender };
        }
      }
    } catch (err) {
      this.logger.error(
        `Error loading SMTP settings from database: ${(err as Error).message}`,
      );
    }

    // Fallback Mock mode or base env
    const userEnv = process.env.GMAIL_USER;
    const passEnv = process.env.GMAIL_APP_PASSWORD;
    if (userEnv && passEnv && userEnv !== 'hello@adruvaSolution.com') {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: userEnv, pass: passEnv },
      });
      return { transporter, sender: userEnv };
    }

    return { transporter: null, sender: 'hello@adruvaSolution.com' };
  }

  async sendUserConfirmation(
    to: string,
    name: string,
    service: string,
    budget: string,
    timeline: string,
  ): Promise<boolean> {
    const subject = `We got your message, ${name}! 🚀`;
    const body = `Hi ${name},

Thank you for reaching out to Adruva Solution!

We've received your inquiry about ${service || 'our services'} and will get back to you within 24 hours.

Your submission details:
- Service: ${service || 'N/A'}
- Budget: ${budget || 'N/A'}
- Timeline: ${timeline || 'N/A'}

In the meantime, feel free to check out our work: https://adruvaSolution.com/work

Best regards,
Team Adruva Solution`;

    return this.sendMail(to, subject, body);
  }

  async sendTeamNotification(inquiry: {
    name: string;
    email: string;
    phone?: string | null;
    companyName?: string | null;
    serviceInterested?: string | null;
    budgetRange?: string | null;
    timeline?: string | null;
    message?: string | null;
  }): Promise<boolean> {
    const teamEmail = process.env.TEAM_EMAIL || 'hello@adruvaSolution.com';
    const subject = `🔔 New Lead: ${inquiry.name} — ${inquiry.serviceInterested || 'General Inquiry'}`;
    const body = `New contact form submission:

Name: ${inquiry.name}
Email: ${inquiry.email}
Phone: ${inquiry.phone || 'N/A'}
Company: ${inquiry.companyName || 'N/A'}
Service: ${inquiry.serviceInterested || 'N/A'}
Budget: ${inquiry.budgetRange || 'N/A'}
Timeline: ${inquiry.timeline || 'N/A'}
Message: ${inquiry.message || 'N/A'}`;

    return this.sendMail(teamEmail, subject, body);
  }

  async sendNewsletterWelcome(to: string): Promise<boolean> {
    const subject = 'Welcome to Adruva Insights! 🎉';
    const body = `Thanks for subscribing!

You'll receive our latest articles on tech, AI, and digital growth.

Best regards,
Team Adruva Solution`;

    return this.sendMail(to, subject, body);
  }

  private async sendMail(
    to: string,
    subject: string,
    text: string,
  ): Promise<boolean> {
    const { transporter, sender } = await this.getTransporter();

    if (!transporter) {
      this.logger.log(`Mock Email sent to: ${to} | Subject: ${subject}`);
      return true;
    }

    try {
      await transporter.sendMail({
        from: `"Adruva Solution" <${sender}>`,
        to,
        subject,
        text,
      });
      this.logger.log(`Email successfully sent to: ${to}`);
      return true;
    } catch (error) {
      this.logger.error(
        `Failed to send email to ${to}: ${(error as Error).message}`,
      );
      return false;
    }
  }

  async sendTestEmail(to: string): Promise<boolean> {
    const subject = `Test Email from Adruva Solution Dashboard`;
    const body = `Hi there,\n\nIf you are receiving this, your SMTP settings are configured correctly!\n\nBest,\nAdruva Solution System`;
    return this.sendMail(to, subject, body);
  }
}
