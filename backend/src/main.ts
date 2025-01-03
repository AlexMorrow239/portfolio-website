import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { json } from 'express';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  // Log all environment variables at startup
  logger.debug('==== All Environment Variables ====');
  Object.keys(process.env).forEach((key) => {
    const isSensitive =
      key.includes('SECRET') || key.includes('PASSWORD') || key.includes('URI');
    logger.debug(`${key}: ${isSensitive ? '[HIDDEN]' : process.env[key]}`);
  });
  logger.debug('==== End Environment Variables ====');

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const configService = app.get(ConfigService);

  // Add debugging logs for critical environment variables
  logger.debug('==== Critical Environment Variables ====');
  const criticalVars = {
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET ? '[SET]' : '[NOT SET]',
    MONGODB_URI: process.env.MONGODB_URI ? '[SET]' : '[NOT SET]',
    ADMIN_USERNAME: process.env.ADMIN_USERNAME ? '[SET]' : '[NOT SET]',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ? '[SET]' : '[NOT SET]',
    FRONTEND_URL: process.env.FRONTEND_URL || '[NOT SET]',
    PORT: process.env.PORT || '3000',
  };
  Object.entries(criticalVars).forEach(([key, value]) => {
    logger.debug(`${key}: ${value}`);
  });
  logger.debug('==== End Critical Variables ====');

  // Add debugging logs for ConfigService
  logger.debug('==== ConfigService Values ====');
  const configVars = {
    JWT_SECRET: configService.get('JWT_SECRET') ? '[SET]' : '[NOT SET]',
    MONGODB_URI: configService.get('MONGODB_URI') ? '[SET]' : '[NOT SET]',
    ADMIN_USERNAME: configService.get('ADMIN_USERNAME') ? '[SET]' : '[NOT SET]',
    ADMIN_PASSWORD: configService.get('ADMIN_PASSWORD') ? '[SET]' : '[NOT SET]',
  };
  Object.entries(configVars).forEach(([key, value]) => {
    logger.debug(`${key} from ConfigService: ${value}`);
  });
  logger.debug('==== End ConfigService Values ====');

  // Validate required environment variables
  const requiredEnvVars = [
    'JWT_SECRET',
    'ADMIN_USERNAME',
    'ADMIN_PASSWORD',
    'MONGODB_URI',
  ];
  const missingVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);
  if (missingVars.length > 0) {
    const errorMessage = `Missing required environment variables: ${missingVars.join(', ')}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  // Production security middleware
  app.use(helmet());
  app.use(compression());
  app.use(json());

  // Set global prefix for all routes
  app.setGlobalPrefix('api');

  // Swagger setup only in development
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Portfolio API')
      .setDescription('Backend API for my portfolio website')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('projects')
      .addTag('auth')
      .addServer('')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
    logger.log(`Swagger documentation available at: /api/docs`);
  }

  // CORS Configuration
  const allowedOrigins = [
    'http://localhost:5173', // Local development
    'http://localhost:4173', // Vite preview
    'http://localhost', // Local docker
    configService.get('FRONTEND_URL'), // Production URL
  ].filter(Boolean);

  logger.debug('==== CORS Configuration ====');
  logger.debug(`Allowed Origins: ${allowedOrigins.join(', ')}`);
  logger.debug('==== End CORS Configuration ====');

  // Enable CORS with configurable origin
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }

      if (
        allowedOrigins.indexOf(origin) !== -1 ||
        process.env.NODE_ENV !== 'production'
      ) {
        callback(null, true);
      } else {
        logger.warn(`Blocked request from unauthorized origin: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    maxAge: 3600,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  // Production-ready logging
  if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
      res.on('finish', () => {
        logger.log(
          `[${new Date().toISOString()}] ${req.method} ${req.path} - ${res.statusCode}`,
        );
      });
      next();
    });
  }

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Application is running on: ${await app.getUrl()}`);
  logger.log(`Environment: ${process.env.NODE_ENV}`);
}

bootstrap().catch((error) => {
  const logger = new Logger('Bootstrap');
  logger.error('Failed to start application:', error);
  process.exit(1);
});
