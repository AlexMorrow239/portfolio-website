import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudStorageService } from './cloud-storage.service';
import { LocalStorageService } from './local-storage.service';
import { StorageFactory } from './storage.factory';

@Module({
  imports: [ConfigModule],
  providers: [CloudStorageService, LocalStorageService, StorageFactory],
  exports: [CloudStorageService, LocalStorageService, StorageFactory],
})
export class MediaModule {}
