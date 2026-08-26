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
    language?: string;
    sort?: string;
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

    if (query.language) {
      where.language = query.language;
    } else {
      // Default to english
      where.language = 'en';
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

    let orderBy: Prisma.WebsiteBlogOrderByWithRelationInput = {
      createdAt: 'desc',
    };
    if (query.sort === 'views') {
      orderBy = { viewsCount: 'desc' };
    } else if (query.sort === 'likes') {
      orderBy = { likesCount: 'desc' };
    }

    const [data, total] = await Promise.all([
      this.prisma.websiteBlog.findMany({
        where,
        orderBy,
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
          translations: {
            select: {
              id: true,
              language: true,
              slug: true,
              title: true,
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
        translations: {
          select: {
            id: true,
            language: true,
            slug: true,
            title: true,
          },
        },
        translationOf: {
          select: {
            id: true,
            language: true,
            slug: true,
            title: true,
            translations: {
              select: {
                id: true,
                language: true,
                slug: true,
                title: true,
              },
            },
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
        translations: {
          select: {
            id: true,
            language: true,
            slug: true,
            title: true,
          },
        },
        translationOf: {
          select: {
            id: true,
            language: true,
            slug: true,
            title: true,
            translations: {
              select: {
                id: true,
                language: true,
                slug: true,
                title: true,
              },
            },
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
        language: dto.language || 'en',
        translationOfId: dto.translationOfId,
        isPinned: dto.isPinned || false,
        pinOrder: dto.pinOrder || 0,
        imageAlignOffset:
          (dto.imageAlignOffset as Prisma.InputJsonValue) || undefined,
        relatedBlogIds: dto.relatedBlogIds || [],
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
      language: dto.language,
      translationOfId: dto.translationOfId,
      isPinned: dto.isPinned,
      pinOrder: dto.pinOrder,
      imageAlignOffset:
        (dto.imageAlignOffset as Prisma.InputJsonValue) || undefined,
      relatedBlogIds: dto.relatedBlogIds,
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

  async incrementViews(id: string) {
    await this.prisma.websiteBlog.update({
      where: { id },
      data: {
        viewsCount: { increment: 1 },
      },
    });
    return { success: true };
  }

  async incrementLikes(id: string) {
    await this.prisma.websiteBlog.update({
      where: { id },
      data: {
        likesCount: { increment: 1 },
      },
    });
    return { success: true };
  }

  async togglePin(
    id: string,
    options: { isPinned?: boolean; pinOrder?: number },
  ) {
    const updated = await this.prisma.websiteBlog.update({
      where: { id },
      data: {
        isPinned: options.isPinned !== undefined ? options.isPinned : undefined,
        pinOrder: options.pinOrder !== undefined ? options.pinOrder : undefined,
      },
    });
    return { success: true, data: updated };
  }

  async autoTranslate(id: string, languages: string[]) {
    const parentBlog = await this.prisma.websiteBlog.findFirst({
      where: { id, deletedAt: null },
    });

    if (!parentBlog) {
      throw new NotFoundException(`Blog post not found`);
    }

    const createdTranslations = [];

    for (const lang of languages) {
      if (lang === parentBlog.language) continue;

      const existing = await this.prisma.websiteBlog.findFirst({
        where: {
          translationOfId: parentBlog.id,
          language: lang,
          deletedAt: null,
        },
      });

      const translatedTitle = `${parentBlog.title} (${lang.toUpperCase()})`;
      const translatedSlug = `${parentBlog.slug}-${lang}`;

      let translatedContent = parentBlog.content;
      if (typeof translatedContent === 'string') {
        translatedContent = `[${lang.toUpperCase()}] ${translatedContent}`;
      } else if (translatedContent && typeof translatedContent === 'object') {
        translatedContent = JSON.parse(JSON.stringify(translatedContent));
      }

      const metaTitle = parentBlog.metaTitle
        ? `${parentBlog.metaTitle} (${lang.toUpperCase()})`
        : null;
      const metaDescription = parentBlog.metaDescription
        ? `[${lang.toUpperCase()}] ${parentBlog.metaDescription}`
        : null;

      if (existing) {
        const updated = await this.prisma.websiteBlog.update({
          where: { id: existing.id },
          data: {
            title: translatedTitle,
            content: translatedContent as Prisma.InputJsonValue,
            metaTitle,
            metaDescription,
            status: parentBlog.status,
          },
        });
        createdTranslations.push(updated);
      } else {
        const created = await this.prisma.websiteBlog.create({
          data: {
            title: translatedTitle,
            slug: translatedSlug,
            coverImageUrl: parentBlog.coverImageUrl,
            coverImageCloudinaryId: parentBlog.coverImageCloudinaryId,
            authorId: parentBlog.authorId,
            category: parentBlog.category,
            tags: parentBlog.tags,
            metaTitle,
            metaDescription,
            ogImageUrl: parentBlog.ogImageUrl,
            content: translatedContent as Prisma.InputJsonValue,
            readingTimeMinutes: parentBlog.readingTimeMinutes,
            status: parentBlog.status,
            language: lang,
            translationOfId: parentBlog.id,
            imageAlignOffset:
              (parentBlog.imageAlignOffset as Prisma.InputJsonValue) ||
              undefined,
            relatedBlogIds: parentBlog.relatedBlogIds,
            publishedAt: parentBlog.publishedAt,
          },
        });
        createdTranslations.push(created);
      }
    }

    return {
      success: true,
      data: createdTranslations,
    };
  }
}
