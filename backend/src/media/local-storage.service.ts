import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LocalStorageService {
  private uploadDir: string;
  private allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

  constructor(private configService: ConfigService) {
    this.uploadDir =
      this.configService.get<string>('media.uploadDir') || 'uploads';

    // Ensure upload directory exists
    const fullUploadPath = path.resolve(this.uploadDir);
    if (!fs.existsSync(fullUploadPath)) {
      fs.mkdirSync(fullUploadPath, { recursive: true });
      console.log(`✓ Created local upload directory: ${fullUploadPath}`);
    }

    console.log(`✓ Using local storage directory: ${fullUploadPath}`);
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Invalid file type. Only JPEG, PNG, and WebP images are allowed.',
      );
    }

    try {
      // Sanitize filename: remove/replace problematic characters
      const sanitizedName = file.originalname
        .replace(/[^\w\.-]/g, '_') // Replace non-word chars with underscores
        .replace(/_+/g, '_') // Replace multiple underscores with single
        .replace(/^_|_$/g, ''); // Remove leading/trailing underscores
      const fileName = `${Date.now()}-${sanitizedName}`;

      const filePath = path.join(this.uploadDir, fileName);

      // Write file to local storage
      fs.writeFileSync(filePath, file.buffer);

      // Return local URL (assuming static file serving is configured)
      const baseUrl =
        this.configService.get<string>('app.baseUrl') ||
        'http://localhost:3000';
      return `${baseUrl}/uploads/${fileName}`;
    } catch (error) {
      console.error('LocalStorage - Upload error:', error);
      throw new InternalServerErrorException(
        'Failed to save image locally. Please try again.',
      );
    }
  }

  async deleteImage(imageUrl: string): Promise<void> {
    try {
      // Extract filename from the URL
      const fileName = imageUrl.split('/uploads/').pop();
      if (!fileName) {
        throw new BadRequestException('Invalid image URL format');
      }

      const filePath = path.join(this.uploadDir, fileName);

      // Check if file exists before attempting to delete
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted local file: ${fileName}`);
      } else {
        console.warn(`File ${fileName} does not exist locally`);
      }
    } catch (error) {
      console.error('LocalStorage - Delete error:', error);
      throw new InternalServerErrorException(
        'Failed to delete image from local storage',
      );
    }
  }
}
