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
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });
  const configService = app.get(ConfigService);

  // Add debugging logs for environment
  logger.debug('==== Environment Variables Debug ====');
  logger.debug(`NODE_ENV: ${process.env.NODE_ENV}`);
  logger.debug(`JWT_SECRET: ${process.env.JWT_SECRET ? 'Set' : 'Not Set'}`);
  logger.debug(
    `ADMIN_USERNAME: ${process.env.ADMIN_USERNAME ? 'Set' : 'Not Set'}`,
  );
  logger.debug(
    `ADMIN_PASSWORD: ${process.env.ADMIN_PASSWORD ? 'Set' : 'Not Set'}`,
  );
  logger.debug(`MONGODB_URI: ${process.env.MONGODB_URI ? 'Set' : 'Not Set'}`);
  logger.debug('==== End Environment Variables ====');
  logger.debug('==== ConfigService Values Debug ====');
  logger.debug(
    `JWT_SECRET from ConfigService: ${configService.get('JWT_SECRET') ? 'Set' : 'Not Set'}`,
  );
  logger.debug(
    `ADMIN_USERNAME from ConfigService: ${configService.get('ADMIN_USERNAME') ? 'Set' : 'Not Set'}`,
  );
  logger.debug(
    `ADMIN_PASSWORD from ConfigService: ${configService.get('ADMIN_PASSWORD') ? 'Set' : 'Not Set'}`,
  );
  logger.debug('==== End ConfigService Values ====');

  // Validate required environment variables
  const requiredEnvVars = ['JWT_SECRET', 'ADMIN_USERNAME', 'ADMIN_PASSWORD'];
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
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
    configService.get('FRONTEND_URL'), // Production URL (from env)
  ].filter(Boolean); // Remove any undefined values

  // Enable CORS with configurable origin
  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
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
    maxAge: 3600, // 1 hour
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

  // Log all registered routes in development
  if (process.env.NODE_ENV !== 'production') {
    const server = app.getHttpServer();
    const router = (server as any)._events.request._router;

    logger.log(`Environment: ${process.env.NODE_ENV}`);
    logger.log('Mapped routes:');
    router.stack.forEach((route) => {
      if (route.route) {
        logger.log(
          `${route.route.stack[0].method.toUpperCase()} ${route.route.path}`,
        );
      }
    });
  }

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
