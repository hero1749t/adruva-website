import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { InquiriesService } from './inquiries.service';
import { CreateInquiryDto } from './dto/create-inquiry.dto';

@Controller('inquiries')
export class InquiriesController {
  constructor(private readonly inquiriesService: InquiriesService) {}

  @Post()
  async create(@Body() dto: CreateInquiryDto, @Req() req: Request) {
    const ipAddress = (req.headers['x-forwarded-for'] as string) || req.ip;
    const userAgent = req.headers['user-agent'];
    return this.inquiriesService.create(dto, ipAddress, userAgent);
  }

  @Get()
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: string,
  ) {
    return this.inquiriesService.findAll({ page, limit, status });
  }

  @Get('export')
  async exportCsv(@Res() res: Response) {
    const csvData = await this.inquiriesService.exportCsv();
    res.set('Content-Type', 'text/csv');
    res.set('Content-Disposition', 'attachment; filename="inquiries.csv"');
    return res.send(csvData);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.inquiriesService.findOne(id);
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.inquiriesService.updateStatus(id, status);
  }
}
