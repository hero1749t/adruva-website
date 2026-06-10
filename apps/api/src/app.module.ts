import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { CommonModule } from './common/common.module';
import { InquiriesModule } from './modules/inquiries/inquiries.module';
import { BlogModule } from './modules/blog/blog.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { ServicesContentModule } from './modules/services-content/services-content.module';
import { TeamModule } from './modules/team/team.module';
import { NewsletterModule } from './modules/newsletter/newsletter.module';
import { AuthModule } from './modules/auth/auth.module';
import { ApplicationsModule } from './modules/applications/applications.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    PrismaModule,
    HealthModule,
    CommonModule,
    InquiriesModule,
    BlogModule,
    ProjectsModule,
    ServicesContentModule,
    TeamModule,
    NewsletterModule,
    AuthModule,
    ApplicationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
