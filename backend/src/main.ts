import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Apply body parser middleware
  app.use(bodyParser.json());

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Portfolio API')
    .setDescription('Backend API for my portfolio website')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('projects')
    .addTag('auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const customOptions = {
    explorer: true,
    customSiteTitle: 'Portfolio API Docs',
    swaggerOptions: {
      persistAuthorization: true,
      requestInterceptor: (req: any) => {
        if (req.body instanceof FormData) {
          req.headers['Content-Type'] = 'multipart/form-data';
        }
        return req;
      },
    },
  };

  SwaggerModule.setup('api', app, document, customOptions);

  // Enable CORS and validation
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  // Add global prefix for all routes
  app.setGlobalPrefix('api');

  // Add global middleware for logging requests
  app.use((req, res, next) => {
    // Log the request after the body has been parsed
    res.on('finish', () => {
      console.log('Incoming request:', {
        method: req.method,
        path: req.path,
        body: req.body,
        query: req.query,
        headers: {
          'content-type': req.headers['content-type'],
          authorization: req.headers['authorization'],
        },
      });
    });
    next();
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
