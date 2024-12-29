import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

@Injectable()
export class MediaService {
  private uploadDir: string;

  constructor(private configService: ConfigService) {
    this.uploadDir =
      this.configService.get<string>('media.uploadDir') || 'uploads';
    this.ensureUploadDirectoryExists();
  }

  private ensureUploadDirectoryExists() {
    const path = join(process.cwd(), this.uploadDir);
    if (!existsSync(path)) {
      mkdirSync(path, { recursive: true });
    }
  }

  async saveFile(
    file: Express.Multer.File,
  ): Promise<{ url: string; alt: string }> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const allowedMimeTypes = this.configService.get<string[]>(
      'media.allowedMimeTypes',
    ) || ['image/jpeg', 'image/png', 'image/webp'];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type');
    }

    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = join(this.uploadDir, fileName);

    return {
      url: `/media/${fileName}`,
      alt: file.originalname,
    };
  }
}
