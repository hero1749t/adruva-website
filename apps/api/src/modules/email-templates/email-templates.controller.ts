import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { EmailTemplatesService } from './email-templates.service';
import { Permissions } from '../../common/decorators/permissions.decorator';

@Controller('email-templates')
export class EmailTemplatesController {
  constructor(private readonly emailTemplatesService: EmailTemplatesService) {}

  @Get()
  @Permissions('settings.edit')
  async findAll() {
    const templates = await this.emailTemplatesService.findAll();
    return {
      success: true,
      data: templates,
    };
  }

  @Get(':type')
  @Permissions('settings.edit')
  async findByType(@Param('type') type: string) {
    const template = await this.emailTemplatesService.findByType(type);
    if (!template) {
      throw new BadRequestException('Template not found');
    }
    return {
      success: true,
      data: template,
    };
  }

  @Put(':id')
  @Permissions('settings.edit')
  async update(
    @Param('id') id: string,
    @Body('subject') subject: string,
    @Body('content') content: string,
  ) {
    if (!subject || !content) {
      throw new BadRequestException('Subject and content are required');
    }
    const template = await this.emailTemplatesService.update(
      id,
      subject,
      content,
    );
    return {
      success: true,
      data: template,
    };
  }

  @Post(':id/test')
  @Permissions('settings.edit')
  async sendTest(@Param('id') id: string, @Body('to') to: string) {
    if (!to) {
      throw new BadRequestException('Recipient email (to) is required');
    }
    const success = await this.emailTemplatesService.sendTest(id, to);
    return {
      success,
      message: success
        ? 'Test email sent successfully!'
        : 'Failed to send test email.',
    };
  }
}
