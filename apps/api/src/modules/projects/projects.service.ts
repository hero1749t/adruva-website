import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: {
    category?: string;
    industry?: string;
    status?: string;
    isFeatured?: string;
  }) {
    const where: Prisma.WebsiteProjectWhereInput = {
      deletedAt: null,
    };

    if (query.category) {
      where.category = query.category;
    }

    if (query.industry) {
      where.industry = query.industry;
    }

    if (query.status) {
      if (query.status !== 'all') {
        where.status = query.status;
      }
    } else {
      // Default to published for public queries
      where.status = 'published';
    }

    if (query.isFeatured !== undefined) {
      where.isFeatured = query.isFeatured === 'true';
    }

    const data = await this.prisma.websiteProject.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return {
      success: true,
      data,
    };
  }

  async findFeatured() {
    const data = await this.prisma.websiteProject.findMany({
      where: {
        isFeatured: true,
        status: 'published',
        deletedAt: null,
      },
      orderBy: { createdAt: 'desc' },
      take: 3,
    });

    return {
      success: true,
      data,
    };
  }

  async findOneBySlug(slug: string) {
    const project = await this.prisma.websiteProject.findFirst({
      where: {
        slug,
        deletedAt: null,
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with slug "${slug}" not found`);
    }

    return {
      success: true,
      data: project,
    };
  }

  async findOne(id: string) {
    const project = await this.prisma.websiteProject.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }

    return {
      success: true,
      data: project,
    };
  }

  async create(dto: CreateProjectDto) {
    // Check for duplicate slug
    const existing = await this.prisma.websiteProject.findFirst({
      where: {
        slug: dto.slug,
        deletedAt: null,
      },
    });
    if (existing) {
      throw new BadRequestException(
        `A project with slug "${dto.slug}" already exists`,
      );
    }

    const project = await this.prisma.websiteProject.create({
      data: {
        title: dto.title,
        slug: dto.slug,
        clientName: dto.clientName,
        industry: dto.industry,
        category: dto.category,
        techStack: dto.techStack || [],
        heroImageUrl: dto.heroImageUrl,
        heroImageCloudinaryId: dto.heroImageCloudinaryId,
        galleryImages:
          dto.galleryImages !== undefined
            ? (dto.galleryImages as Prisma.InputJsonValue)
            : undefined,
        problem: dto.problem,
        solution: dto.solution,
        results: dto.results,
        isFeatured: dto.isFeatured || false,
        metaTitle: dto.metaTitle,
        metaDescription: dto.metaDescription,
        ogImageUrl: dto.ogImageUrl,
        status: dto.status || 'draft',
      },
    });

    return {
      success: true,
      data: project,
    };
  }

  async update(id: string, dto: UpdateProjectDto) {
    const project = await this.prisma.websiteProject.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }

    // Check duplicate slug if slug is being changed
    if (dto.slug && dto.slug !== project.slug) {
      const existing = await this.prisma.websiteProject.findFirst({
        where: {
          slug: dto.slug,
          deletedAt: null,
        },
      });
      if (existing) {
        throw new BadRequestException(
          `A project with slug "${dto.slug}" already exists`,
        );
      }
    }

    const updatedProject = await this.prisma.websiteProject.update({
      where: { id },
      data: {
        title: dto.title,
        slug: dto.slug,
        clientName: dto.clientName,
        industry: dto.industry,
        category: dto.category,
        techStack: dto.techStack,
        heroImageUrl: dto.heroImageUrl,
        heroImageCloudinaryId: dto.heroImageCloudinaryId,
        galleryImages:
          dto.galleryImages !== undefined
            ? (dto.galleryImages as Prisma.InputJsonValue)
            : undefined,
        problem: dto.problem,
        solution: dto.solution,
        results: dto.results,
        isFeatured: dto.isFeatured,
        metaTitle: dto.metaTitle,
        metaDescription: dto.metaDescription,
        ogImageUrl: dto.ogImageUrl,
        status: dto.status,
      },
    });

    return {
      success: true,
      data: updatedProject,
    };
  }

  async delete(id: string) {
    const project = await this.prisma.websiteProject.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }

    await this.prisma.websiteProject.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return {
      success: true,
      message: 'Project deleted successfully (soft delete)',
    };
  }

  async toggleFeatured(id: string) {
    const project = await this.prisma.websiteProject.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }

    const updatedProject = await this.prisma.websiteProject.update({
      where: { id },
      data: {
        isFeatured: !project.isFeatured,
      },
    });

    return {
      success: true,
      data: updatedProject,
    };
  }

  async seedNewProjects() {
    await this.prisma.websiteProject.deleteMany();
    const newProjects = [
      {
        title: 'Bali Yoga Teacher Training',
        slug: 'bali-yoga-teacher-training',
        category: 'build',
        industry: 'education',
        techStack: [
          'Next.js',
          'NestJS',
          'PostgreSQL',
          'Tailwind CSS',
          'TanStack Query',
        ],
        heroImageUrl: 'from-orange-600 to-amber-950',
        isFeatured: true,
        clientName: 'Bali Yoga Teacher Training Center',
        problem:
          'The school relied on a slow WordPress installation that crashed during high-traffic batch announcements. Students faced transaction failures on overseas credit cards, and the sales team struggled to track abandoned registrations.',
        solution:
          'We decoupled the system into a headless Next.js frontend and a NestJS backend. We integrated dynamic internationalization (i18n), secure multi-currency payment pipelines (Stripe/PayPal), and custom abandoned-cart logs that alert the sales team via instant dashboards.',
        results: JSON.stringify([
          { metric: '240%', label: 'Increase in Booking Conversion' },
          { metric: '0%', label: 'Server Downtime in Launches' },
          { metric: '35%', label: 'Recaptured Cart Leads' },
        ]),
        galleryImages: JSON.stringify([
          'from-orange-800 to-amber-900',
          'from-rose-900/50 to-orange-950',
          'from-amber-950 to-yellow-900',
        ]),
        status: 'published',
        metaTitle: 'Bali Yoga Teacher Training | Case Studies',
        metaDescription:
          'A high-performance headless booking engine and CRM database built to manage yoga teacher training course enrollments and payments worldwide.',
      },
      {
        title: 'Vintage Tours & Travels',
        slug: 'vintage-tours-and-travels',
        category: 'grow',
        industry: 'retail',
        techStack: [
          'React',
          'Tailwind CSS',
          'Google Maps API',
          'SEO Optimization',
        ],
        heroImageUrl: 'from-cyan-900 to-emerald-950',
        isFeatured: true,
        clientName: 'Vintage Tours & Travels India',
        problem:
          'The agency was losing organic traffic to massive aggregators. Their site had poor mobile UX, slow load times, and no clear booking flow for international customers seeking custom Himalayan itineraries.',
        solution:
          'We rebuilt the customer journey with a mobile-first catalog, integrated a dynamic travel package planner, structured schema tags for local search relevance, and optimized media rendering to achieve 98+ PageSpeed scores.',
        results: JSON.stringify([
          { metric: '+180%', label: 'Organic Search Traffic' },
          { metric: 'No. 1', label: 'Local Map Rankings' },
          { metric: '4.2x', label: 'Inbound Package Queries' },
        ]),
        galleryImages: JSON.stringify([
          'from-cyan-950 to-emerald-950',
          'from-teal-900 to-green-950',
          'from-emerald-900 to-cyan-900',
        ]),
        status: 'published',
        metaTitle: 'Vintage Tours & Travels | Case Studies',
        metaDescription:
          'A complete organic search optimization and custom package booking engine that positioned the brand on Page 1 for premium adventure tours.',
      },
      {
        title: 'Adruva Resto System',
        slug: 'adruva-resto-system',
        category: 'automate',
        industry: 'technology',
        techStack: ['React', 'Prisma', 'Tailwind CSS', 'Node.js', 'WebSocket'],
        heroImageUrl: 'from-rose-950 to-orange-950',
        isFeatured: true,
        clientName: 'Adruva Hospitality Group',
        problem:
          'Restaurants suffered high cart abandonment on tables during rush hours. Waiters spent too much time writing manual tickets, leading to dispatch errors and lost analytics data.',
        solution:
          'We designed a localized QR-menu browser app that requires zero app installs. Customers scan, order, and pay directly. The system syncs in real-time with the kitchen dashboard via WebSockets and features local backup database sync in case of Internet dropouts.',
        results: JSON.stringify([
          { metric: '25%', label: 'Faster Table Turnover' },
          { metric: '-90%', label: 'Order Dispatch Errors' },
          { metric: '18%', label: 'Average Bill Value Growth' },
        ]),
        galleryImages: JSON.stringify([
          'from-rose-950 to-orange-950',
          'from-red-900 to-amber-950',
          'from-orange-900/60 to-rose-950',
        ]),
        status: 'published',
        metaTitle: 'Adruva Resto System | Case Studies',
        metaDescription:
          'An advanced offline-first restaurant SaaS platform with contactless QR code menus, instant order dispatching, and live billing metrics.',
      },
    ];

    const seeded = [];
    for (const p of newProjects) {
      const created = await this.prisma.websiteProject.create({ data: p });
      seeded.push(created);
    }
    return { success: true, count: seeded.length, data: seeded };
  }
}
