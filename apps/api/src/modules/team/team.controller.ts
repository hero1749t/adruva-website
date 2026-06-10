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
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  async findAll(@Query('all') all?: string) {
    return this.teamService.findAll({ all });
  }

  @Post()
  async create(@Body() dto: CreateTeamDto) {
    return this.teamService.create(dto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTeamDto) {
    return this.teamService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.teamService.delete(id);
  }
}
