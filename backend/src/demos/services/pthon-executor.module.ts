import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PythonExecutorService } from './python-executor.service';

@Module({
  imports: [ConfigModule],
  providers: [PythonExecutorService],
  exports: [PythonExecutorService],
})
export class PythonExecutorModule {}
