import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  // Global prefix for all routes
  app.setGlobalPrefix('api');

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Portfolio API')
    .setDescription('The Portfolio API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // CORS Configuration
  const allowedOrigins = [
    'http://localhost:5173', // Vite default
    'http://localhost:4173', // Vite preview
    'http://127.0.0.1:5173', // Alternative local
    'http://localhost:3000', // Local API
    'https://frontend-production-284b.up.railway.app', // Production frontend
    configService.get('FRONTEND_URL'), // From env
  ].filter(Boolean); // Remove any undefined/null values

  logger.log(`Allowed Origins: ${allowedOrigins.join(', ')}`);

  app.enableCors({
    origin: (origin, callback) => {
      logger.log(`Incoming request from origin: ${origin}`);

      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) {
        logger.log('No origin provided, allowing request');
        callback(null, true);
        return;
      }

      // Allow all origins in development
      if (process.env.NODE_ENV === 'development') {
        logger.log('Development mode: allowing all origins');
        callback(null, true);
        return;
      }

      // Check if origin is in allowed list
      if (allowedOrigins.includes(origin)) {
        logger.log(`Origin ${origin} is allowed`);
        callback(null, true);
        return;
      }

      // Log unauthorized attempts
      logger.warn(`Blocked request from unauthorized origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'Origin',
      'X-Requested-With',
    ],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 3600,
  });

  // Global pipes and filters
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  // Start the server
  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Application running on port ${port} (${process.env.NODE_ENV})`);
  logger.log(
    `Swagger documentation available at: http://localhost:${port}/api/docs`,
  );
}

bootstrap().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});
