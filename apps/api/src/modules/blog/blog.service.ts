import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: {
    page?: string;
    limit?: string;
    category?: string;
    status?: string;
    search?: string;
  }) {
    const page = Math.max(1, parseInt(query.page || '1', 10));
    const limit = Math.max(1, parseInt(query.limit || '9', 10));
    const skip = (page - 1) * limit;

    const where: Prisma.WebsiteBlogWhereInput = {
      deletedAt: null,
    };

    if (query.category) {
      where.category = query.category;
    }

    if (query.status) {
      if (query.status !== 'all') {
        where.status = query.status;
      }
    } else {
      // Default to published for general list requests
      where.status = 'published';
    }

    if (query.search) {
      where.title = {
        contains: query.search,
        mode: 'insensitive',
      };
    }

    const [data, total] = await Promise.all([
      this.prisma.websiteBlog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              designation: true,
              photoUrl: true,
              linkedinUrl: true,
            },
          },
        },
      }),
      this.prisma.websiteBlog.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  async findOneBySlug(slug: string) {
    const blog = await this.prisma.websiteBlog.findFirst({
      where: {
        slug,
        deletedAt: null,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            designation: true,
            photoUrl: true,
            linkedinUrl: true,
          },
        },
      },
    });

    if (!blog) {
      throw new NotFoundException(`Blog post with slug "${slug}" not found`);
    }

    return {
      success: true,
      data: blog,
    };
  }

  async findOne(id: string) {
    const blog = await this.prisma.websiteBlog.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            designation: true,
            photoUrl: true,
            linkedinUrl: true,
          },
        },
      },
    });

    if (!blog) {
      throw new NotFoundException(`Blog post with ID "${id}" not found`);
    }

    return {
      success: true,
      data: blog,
    };
  }

  async create(dto: CreateBlogDto) {
    // Check for duplicate slug
    const existing = await this.prisma.websiteBlog.findFirst({
      where: {
        slug: dto.slug,
        deletedAt: null,
      },
    });
    if (existing) {
      throw new BadRequestException(
        `A blog post with slug "${dto.slug}" already exists`,
      );
    }

    const publishedAt = dto.status === 'published' ? new Date() : null;

    const blog = await this.prisma.websiteBlog.create({
      data: {
        title: dto.title,
        slug: dto.slug,
        coverImageUrl: dto.coverImageUrl,
        coverImageCloudinaryId: dto.coverImageCloudinaryId,
        authorId: dto.authorId,
        category: dto.category,
        tags: dto.tags || [],
        metaTitle: dto.metaTitle,
        metaDescription: dto.metaDescription,
        ogImageUrl: dto.ogImageUrl,
        content: dto.content as Prisma.InputJsonValue,
        readingTimeMinutes: dto.readingTimeMinutes,
        status: dto.status || 'draft',
        publishedAt,
      },
      include: {
        author: true,
      },
    });

    return {
      success: true,
      data: blog,
    };
  }

  async update(id: string, dto: UpdateBlogDto) {
    const blog = await this.prisma.websiteBlog.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!blog) {
      throw new NotFoundException(`Blog post with ID "${id}" not found`);
    }

    // Check duplicate slug if slug is being changed
    if (dto.slug && dto.slug !== blog.slug) {
      const existing = await this.prisma.websiteBlog.findFirst({
        where: {
          slug: dto.slug,
          deletedAt: null,
        },
      });
      if (existing) {
        throw new BadRequestException(
          `A blog post with slug "${dto.slug}" already exists`,
        );
      }
    }

    const updateData: Prisma.WebsiteBlogUncheckedUpdateInput = {
      title: dto.title,
      slug: dto.slug,
      coverImageUrl: dto.coverImageUrl,
      coverImageCloudinaryId: dto.coverImageCloudinaryId,
      authorId: dto.authorId,
      category: dto.category,
      tags: dto.tags,
      metaTitle: dto.metaTitle,
      metaDescription: dto.metaDescription,
      ogImageUrl: dto.ogImageUrl,
      content: dto.content as Prisma.InputJsonValue,
      readingTimeMinutes: dto.readingTimeMinutes,
      status: dto.status,
    };

    if (dto.status === 'published' && blog.status !== 'published') {
      updateData.publishedAt = new Date();
    } else if (dto.status === 'draft') {
      updateData.publishedAt = null;
    }

    const updatedBlog = await this.prisma.websiteBlog.update({
      where: { id },
      data: updateData,
      include: {
        author: true,
      },
    });

    return {
      success: true,
      data: updatedBlog,
    };
  }

  async delete(id: string) {
    const blog = await this.prisma.websiteBlog.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!blog) {
      throw new NotFoundException(`Blog post with ID "${id}" not found`);
    }

    await this.prisma.websiteBlog.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return {
      success: true,
      message: 'Blog post deleted successfully (soft delete)',
    };
  }

  async togglePublish(id: string) {
    const blog = await this.prisma.websiteBlog.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!blog) {
      throw new NotFoundException(`Blog post with ID "${id}" not found`);
    }

    const newStatus = blog.status === 'published' ? 'draft' : 'published';
    const publishedAt = newStatus === 'published' ? new Date() : null;

    const updatedBlog = await this.prisma.websiteBlog.update({
      where: { id },
      data: {
        status: newStatus,
        publishedAt,
      },
      include: {
        author: true,
      },
    });

    return {
      success: true,
      data: updatedBlog,
    };
  }
}
