import { Controller, Get, Post, Body, Query, Res } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { SubscribeNewsletterDto } from './dto/subscribe-newsletter.dto';
import type { Response } from 'express';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('subscribe')
  async subscribe(@Body() dto: SubscribeNewsletterDto) {
    return this.newsletterService.subscribe(dto);
  }

  @Get('subscribers')
  async findAllSubscribers(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.newsletterService.findAllSubscribers({ page, limit });
  }

  @Get('export')
  async exportCsv(@Res() res: Response) {
    const csvData = await this.newsletterService.exportCsv();
    res.set('Content-Type', 'text/csv');
    res.set('Content-Disposition', 'attachment; filename="subscribers.csv"');
    return res.send(csvData);
  }
}
