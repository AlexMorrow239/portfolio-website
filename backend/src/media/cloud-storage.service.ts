import { Storage } from '@google-cloud/storage';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudStorageService {
  private storage: Storage;
  private bucket: string;
  private allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

  constructor(private configService: ConfigService) {
    const credentialsJson = this.configService.get<string>(
      'googleCloud.credentials',
    );
    const keyFilename = this.configService.get<string>('googleCloud.keyFile');

    try {
      if (credentialsJson) {
        // Parse credentials from environment variable
        const credentials = JSON.parse(credentialsJson);
        this.storage = new Storage({ credentials });
        console.log('✓ Google Cloud Storage initialized with credentials JSON');
      } else if (keyFilename) {
        // Fallback to keyfile if no credentials in env
        this.storage = new Storage({ keyFilename });
        console.log(
          '✓ Google Cloud Storage initialized with keyfile:',
          keyFilename,
        );
      } else {
        throw new Error('No Google Cloud credentials provided');
      }

      this.bucket =
        this.configService.get<string>('googleCloud.bucket') ||
        'personal-media-uploads';
      console.log(`✓ Using GCS bucket: ${this.bucket}`);
    } catch (error) {
      console.error('Failed to initialize Google Cloud Storage:', error);
      throw new Error('Failed to initialize storage service');
    }
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Invalid file type. Only JPEG, PNG, and WebP images are allowed.',
      );
    }

    try {
      const bucket = this.storage.bucket(this.bucket);
      // Sanitize filename: remove/replace problematic characters
      const sanitizedName = file.originalname
        .replace(/[^\w\.-]/g, '_') // Replace non-word chars with underscores
        .replace(/_+/g, '_') // Replace multiple underscores with single
        .replace(/^_|_$/g, ''); // Remove leading/trailing underscores
      const fileName = `${Date.now()}-${sanitizedName}`;

      const blob = bucket.file(fileName);

      const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: {
          contentType: file.mimetype,
        },
      });

      return new Promise((resolve, reject) => {
        blobStream.on('error', (error) => {
          console.error('CloudStorage - Upload error:', error);
          if ((error as any).code === 'ENOTFOUND') {
            reject(
              new InternalServerErrorException(
                'Network error. Please try again later.',
              ),
            );
          } else {
            reject(
              new BadRequestException(
                'Failed to upload image. Please try again later.',
              ),
            );
          }
        });

        blobStream.on('finish', () => {
          const publicUrl = `https://storage.googleapis.com/${this.bucket}/${fileName}`;
          resolve(publicUrl);
        });

        blobStream.end(file.buffer);
      });
    } catch (error) {
      console.error('CloudStorage - Error:', error);
      throw new InternalServerErrorException(
        'An unexpected error occurred during the upload process.',
      );
    }
  }

  async deleteImage(imageUrl: string): Promise<void> {
    try {
      // Extract filename from the URL
      const fileName = imageUrl.split(`${this.bucket}/`)[1];
      if (!fileName) {
        throw new BadRequestException('Invalid image URL format');
      }

      const bucket = this.storage.bucket(this.bucket);
      const file = bucket.file(fileName);

      // Check if file exists before attempting to delete
      const [exists] = await file.exists();
      if (!exists) {
        console.warn(`File ${fileName} does not exist in bucket`);
        return;
      }

      await file.delete();
    } catch (error) {
      console.error('CloudStorage - Delete error:', error);
      throw new InternalServerErrorException(
        'Failed to delete image from storage',
      );
    }
  }
}
