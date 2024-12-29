import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectConnection() private connection: Connection) {}

  getHello(): string {
    const isConnected = this.connection.readyState === 1;
    return isConnected
      ? 'Hello World! Database is connected!'
      : 'Hello World! Database is not connected!';
  }
}
