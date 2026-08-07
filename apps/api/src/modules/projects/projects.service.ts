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
          'The Bali Yoga Teacher Training Center was using a legacy WordPress and WooCommerce setup that struggled to handle traffic surges. Whenever new batches or seasonal discounts were announced, server response times spiked to over 15 seconds, frequently causing complete site crashes. This bottleneck directly led to lost bookings during peak sales windows.\n\nFurthermore, students enrolling from various parts of the world—including Europe, the USA, and South America—faced constant payment transaction failures. The legacy plugin stack lacked localized currency support and intelligent routing for international credit cards, causing frustrated customers to abandon their carts. The sales team had no visibility into these dropped registrations, with no way to follow up or recover high-value leads.',
        solution:
          "To address these infrastructure and conversion challenges, we built a modern headless booking ecosystem from the ground up.\n\nWe separated the user experience by building a high-speed Next.js frontend deployed on Vercel. For the backend, we developed a robust, highly performant NestJS API running on a scalable Docker instance. This decoupled architecture brought server response times down to under 150ms and completely eliminated launch-day server crashes.\n\nTo optimize the global booking flow, we implemented dynamic internationalization (i18n) and integrated a smart payment router using Stripe and PayPal. The system automatically detects the student's country, displays localized pricing, and handles multi-currency transactions smoothly. We also built a custom database logging pipeline that captures incomplete registrations. When a student abandons their checkout, the sales team receives a real-time notification on a custom-designed dashboard, enabling them to reach out and recover sales immediately.",
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
          'Vintage Tours & Travels was losing significant organic search traffic to massive aggregator platforms. Their legacy site suffered from poor mobile optimization, slow load times on slow 3G/4G networks, and lacked a structured layout for displaying complex custom travel itineraries. This made it difficult for adventure travelers to explore packages and make direct queries.\n\nAdditionally, search engines could not properly index their high-quality Himalayan itineraries because the website lacked structured schema markup. Without local search relevance, the brand was virtually invisible on search result pages, even when potential clients searched for premium adventure tours in their target geographic regions.',
        solution:
          'We implemented a comprehensive digital transformation strategy focusing on mobile-first user experience and advanced search engine optimization (SEO).\n\nFirst, we redesigned and rebuilt the client interface using React and Tailwind CSS, focusing on micro-interactions and smooth navigation. We implemented a dynamic custom package planner that allows users to visualize and customize their itineraries interactively, integrated with the Google Maps API for visual route mapping. Every image and asset was optimized, bringing their Google PageSpeed score from 40 to 98+.\n\nTo drive organic growth, we structured detailed schema tags (local business, product, and breadcrumb schemas) across the entire platform. This optimization allowed search engines to index and feature their tours directly in search snippets. Within three months, the site ranked on Page 1 of Google for premium adventure travel keywords, bringing in a massive surge of organic inquiries without paid ad spend.',
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
          'Traditional restaurants face a major operational bottleneck during rush hours. Waiters spend a significant portion of their shifts running back and forth between tables, cash registers, and the kitchen, leading to order dispatch delays and frequent kitchen communication errors.\n\nManual billing and ticket writing resulted in an average order error rate of 12%, causing food waste and customer dissatisfaction. Furthermore, restaurant owners had no real-time data on table turnover rates, peak sales hours, or dish popularity, making inventory management and staffing decisions highly inefficient.',
        solution:
          "We engineered 'Adruva Resto', an offline-first restaurant automation SaaS platform designed to streamline operations from ordering to billing.\n\nWe created a web application that works by scanning table-specific QR codes. Customers can browse the rich, visual menu, customize orders (such as selecting spice levels or add-ons), and send orders directly to the kitchen without needing to install any app. The orders are dispatched instantly to a tablet-based kitchen dashboard via WebSockets.\n\nTo ensure uninterrupted operations during internet outages, we implemented a local backup synchronization system. Orders are stored locally in the browser's IndexedDB database and synchronized with a local kitchen server, then pushed to the cloud once the connection is restored. The backend dashboard provides owners with real-time billing metrics, daily revenue charts, table turnover statistics, and live inventory alerts, reducing order dispatch errors by 90% and increasing table turnover speed by 25%.",
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
