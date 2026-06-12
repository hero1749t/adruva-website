import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { CareersService } from './careers.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Controller('careers')
export class CareersController {
  constructor(private readonly careersService: CareersService) {}

  @Get()
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('department') department?: string,
    @Query('status') status?: string,
    @Query('search') search?: string,
  ) {
    return this.careersService.findAll({
      page,
      limit,
      department,
      status,
      search,
    });
  }

  @Get(':param')
  async findOne(@Param('param') param: string) {
    const isUuid =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        param,
      );
    if (isUuid) {
      return this.careersService.findOne(param);
    }
    return this.careersService.findOneBySlug(param);
  }

  @Post()
  async create(@Body() dto: CreateJobDto) {
    return this.careersService.create(dto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateJobDto) {
    return this.careersService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.careersService.delete(id);
  }
}
