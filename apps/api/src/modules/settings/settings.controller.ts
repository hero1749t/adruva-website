import { Body, Controller, Get, Post } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { EmailService } from '../../common/email/email.service';

@Controller('settings')
export class SettingsController {
  constructor(
    private readonly settingsService: SettingsService,
    private readonly emailService: EmailService,
  ) {}

  @Get()
  async findAll() {
    return this.settingsService.findAll();
  }

  @Post()
  async updateBulk(@Body() body: Record<string, string>) {
    return this.settingsService.updateBulk(body);
  }

  @Post('test-email')
  async testEmail(@Body('to') to: string) {
    if (!to) {
      return { success: false, message: 'Recipient email is required' };
    }
    const success = await this.emailService.sendTestEmail(to);
    if (success) {
      return { success: true, message: 'Test email sent successfully!' };
    }
    return {
      success: false,
      message:
        'Failed to send test email. Check SMTP settings or backend logs.',
    };
  }
}
