import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CloudStorageService } from './cloud-storage.service';
import { LocalStorageService } from './local-storage.service';

export interface StorageService {
  uploadImage(file: Express.Multer.File): Promise<string>;
  deleteImage(imageUrl: string): Promise<void>;
}

@Injectable()
export class StorageFactory {
  constructor(
    private configService: ConfigService,
    private cloudStorageService: CloudStorageService,
    private localStorageService: LocalStorageService,
  ) {}

  getStorageService(): StorageService {
    const useLocalStorage =
      this.configService.get<boolean>('USE_LOCAL_STORAGE');
    const hasGcsCredentials =
      this.configService.get<string>('googleCloud.credentials') ||
      this.configService.get<string>('googleCloud.keyFile');

    if (useLocalStorage || !hasGcsCredentials) {
      console.log('📁 Using local file storage');
      return this.localStorageService;
    } else {
      console.log('☁️ Using Google Cloud Storage');
      return this.cloudStorageService;
    }
  }
}
