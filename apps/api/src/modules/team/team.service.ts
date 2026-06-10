import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query?: { all?: string }) {
    const showAll = query?.all === 'true';
    const where = showAll ? {} : { isActive: true };

    const data = await this.prisma.websiteTeam.findMany({
      where,
      orderBy: {
        sortOrder: 'asc',
      },
    });

    return {
      success: true,
      data,
    };
  }

  async findOne(id: string) {
    const member = await this.prisma.websiteTeam.findUnique({
      where: { id },
    });

    if (!member) {
      throw new NotFoundException(`Team member with ID "${id}" not found`);
    }

    return {
      success: true,
      data: member,
    };
  }

  async create(dto: CreateTeamDto) {
    const member = await this.prisma.websiteTeam.create({
      data: {
        name: dto.name,
        designation: dto.designation,
        photoUrl: dto.photoUrl,
        photoCloudinaryId: dto.photoCloudinaryId,
        linkedinUrl: dto.linkedinUrl,
        sortOrder: dto.sortOrder || 0,
        isActive: dto.isActive !== undefined ? dto.isActive : true,
      },
    });

    return {
      success: true,
      data: member,
    };
  }

  async update(id: string, dto: UpdateTeamDto) {
    const member = await this.prisma.websiteTeam.findUnique({
      where: { id },
    });

    if (!member) {
      throw new NotFoundException(`Team member with ID "${id}" not found`);
    }

    const updatedMember = await this.prisma.websiteTeam.update({
      where: { id },
      data: {
        name: dto.name,
        designation: dto.designation,
        photoUrl: dto.photoUrl,
        photoCloudinaryId: dto.photoCloudinaryId,
        linkedinUrl: dto.linkedinUrl,
        sortOrder: dto.sortOrder,
        isActive: dto.isActive,
      },
    });

    return {
      success: true,
      data: updatedMember,
    };
  }

  async delete(id: string) {
    const member = await this.prisma.websiteTeam.findUnique({
      where: { id },
    });

    if (!member) {
      throw new NotFoundException(`Team member with ID "${id}" not found`);
    }

    // Check if the team member has authored any blog posts
    const blogCount = await this.prisma.websiteBlog.count({
      where: {
        authorId: id,
        deletedAt: null,
      },
    });

    if (blogCount > 0) {
      throw new BadRequestException(
        `Cannot delete team member because they have authored ${blogCount} blog post(s). ` +
          `Please reassign or delete the blogs first, or deactivate this team member (set isActive = false) instead.`,
      );
    }

    await this.prisma.websiteTeam.delete({
      where: { id },
    });

    return {
      success: true,
      message: 'Team member deleted successfully',
    };
  }
}
