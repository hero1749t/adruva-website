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
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async findAll(
    @Query('category') category?: string,
    @Query('industry') industry?: string,
    @Query('status') status?: string,
    @Query('isFeatured') isFeatured?: string,
  ) {
    return this.projectsService.findAll({
      category,
      industry,
      status,
      isFeatured,
    });
  }

  @Get('featured')
  async findFeatured() {
    return this.projectsService.findFeatured();
  }

  @Get(':slug')
  async findOneBySlug(@Param('slug') slug: string) {
    return this.projectsService.findOneBySlug(slug);
  }

  @Post()
  async create(@Body() dto: CreateProjectDto) {
    return this.projectsService.create(dto);
  }

  @Post('seed-new-projects-action')
  async seedNewProjects() {
    return this.projectsService.seedNewProjects();
  }
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projectsService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.projectsService.delete(id);
  }

  @Patch(':id/featured')
  async toggleFeatured(@Param('id') id: string) {
    return this.projectsService.toggleFeatured(id);
  }
}
