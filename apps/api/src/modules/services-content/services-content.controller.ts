import { Controller, Get, Patch, Body, Param } from '@nestjs/common';
import { ServicesContentService } from './services-content.service';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('services')
export class ServicesContentController {
  constructor(
    private readonly servicesContentService: ServicesContentService,
  ) {}

  @Get()
  async findAll() {
    return this.servicesContentService.findAll();
  }

  @Get(':slug')
  async findOneBySlug(@Param('slug') slug: string) {
    return this.servicesContentService.findOneBySlug(slug);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateServiceDto) {
    return this.servicesContentService.update(id, dto);
  }
}
