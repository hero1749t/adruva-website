import { Body, Controller, Get, Post } from '@nestjs/common';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async findAll() {
    return this.settingsService.findAll();
  }

  @Post()
  async updateBulk(@Body() body: Record<string, string>) {
    return this.settingsService.updateBulk(body);
  }
}
