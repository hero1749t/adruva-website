import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security
  app.use(helmet());

  const allowedOrigins = [
    'http://localhost:3000',
    'https://adruvasolution.com',
    'https://www.adruvasolution.com',
  ];
  if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
    if (process.env.FRONTEND_URL.includes('www.')) {
      allowedOrigins.push(process.env.FRONTEND_URL.replace('www.', ''));
    } else if (process.env.FRONTEND_URL.includes('https://')) {
      allowedOrigins.push(
        process.env.FRONTEND_URL.replace('https://', 'https://www.'),
      );
    }
  }

  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      // Allow requests with no origin (like mobile apps, postman or curl)
      if (!origin) return callback(null, true);

      const isAllowed =
        allowedOrigins.includes(origin) ||
        allowedOrigins.some(
          (allowed) => origin.toLowerCase() === allowed.toLowerCase(),
        );

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
  });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Shutdown hooks
  app.enableShutdownHooks();

  // API prefix
  app.setGlobalPrefix('api/v1', { exclude: ['health', 'api/v1/health'] });

  await app.listen(process.env.PORT || 3001);
}
void bootstrap();
