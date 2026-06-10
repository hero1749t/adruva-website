import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;

    if (user && pass && user !== 'hello@adruvaSolution.com') {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user, pass },
      });
    } else {
      this.logger.warn(
        'GMAIL_USER and GMAIL_APP_PASSWORD not configured. Emails will be mocked.',
      );
    }
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
    if (!this.transporter) {
      this.logger.log(`Mock Email sent to: ${to} | Subject: ${subject}`);
      return true;
    }

    try {
      await this.transporter.sendMail({
        from: `"Adruva Solution" <${process.env.GMAIL_USER}>`,
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
}
