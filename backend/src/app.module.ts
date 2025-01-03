import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { MediaModule } from './media/media.module';
import { CommonModule } from './common/common.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `.env.${process.env.NODE_ENV}.local`,
        `.env.${process.env.NODE_ENV}`,
        '.env.local',
        '.env',
      ],
      load: [
        () => {
          const logger = new Logger('ConfigModule');
          logger.debug('==== Config Module Initialization ====');
          logger.debug(
            `Loading env files for NODE_ENV: ${process.env.NODE_ENV}`,
          );
          logger.debug(`Attempted env files:`);
          [
            `.env.${process.env.NODE_ENV}.local`,
            `.env.${process.env.NODE_ENV}`,
            '.env.local',
            '.env',
          ].forEach((file) => logger.debug(`- ${file}`));

          // Log all environment variables (be careful with sensitive data)
          logger.debug('Environment variables loaded:');
          Object.keys(process.env).forEach((key) => {
            logger.debug(
              `${key}: ${key.includes('SECRET') || key.includes('PASSWORD') ? '[HIDDEN]' : 'Set'}`,
            );
          });

          logger.debug('==== End Config Module Init ====');
          return {};
        },
      ],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const logger = new Logger('MongooseModule');
        const uri = configService.get<string>('MONGODB_URI');
        logger.debug(`MongoDB URI ${uri ? 'is set' : 'is NOT set'}`);
        logger.debug(`SSL Mode: ${process.env.NODE_ENV === 'production'}`);

        return {
          uri,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          retryWrites: true,
          w: 'majority',
          ssl: process.env.NODE_ENV === 'production',
        };
      },
    }),
    AuthModule,
    ProjectsModule,
    MediaModule,
    CommonModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
