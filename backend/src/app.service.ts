import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectConnection() private connection: Connection,
    private configService: ConfigService,
  ) {}

  getApiInfo() {
    const dbStatus = {
      isConnected: this.connection.readyState === 1,
      state: ['disconnected', 'connected', 'connecting', 'disconnecting'][
        this.connection.readyState
      ],
      host: this.connection.host,
      name: this.connection.name,
    };

    return {
      name: 'Your API Name',
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
      database: dbStatus,
      uptime: process.uptime(),
    };
  }
}
