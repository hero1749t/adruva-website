import { Body, Controller, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  async create(@Body() dto: CreateApplicationDto, @Req() req: Request) {
    const ipAddress = (req.headers['x-forwarded-for'] as string) || req.ip;
    return this.applicationsService.create(dto, ipAddress);
  }
}
