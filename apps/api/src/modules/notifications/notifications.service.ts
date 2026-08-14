import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: { limit?: string; page?: string }) {
    const limit = Math.max(1, parseInt(query.limit || '50', 10));
    const page = Math.max(1, parseInt(query.page || '1', 10));
    const skip = (page - 1) * limit;

    const [unread, recent, total] = await Promise.all([
      this.prisma.websiteNotification.findMany({
        where: { isRead: false },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.websiteNotification.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.websiteNotification.count(),
    ]);

    return {
      success: true,
      data: {
        unread,
        recent,
      },
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async create(data: {
    type: string;
    title: string;
    message: string;
    link?: string;
  }) {
    const notification = await this.prisma.websiteNotification.create({
      data: {
        type: data.type,
        title: data.title,
        message: data.message,
        link: data.link,
      },
    });

    return {
      success: true,
      data: notification,
    };
  }

  async markAsRead(id: string) {
    const check = await this.prisma.websiteNotification.findUnique({
      where: { id },
    });

    if (!check) {
      throw new NotFoundException('Notification not found');
    }

    const updated = await this.prisma.websiteNotification.update({
      where: { id },
      data: { isRead: true },
    });

    return {
      success: true,
      data: updated,
    };
  }

  async markAllAsRead() {
    await this.prisma.websiteNotification.updateMany({
      where: { isRead: false },
      data: { isRead: true },
    });

    return {
      success: true,
      message: 'All notifications marked as read',
    };
  }
}
