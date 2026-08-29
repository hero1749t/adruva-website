import { Injectable, Logger } from '@nestjs/common';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { R2Service } from './r2.service';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private provider: 'cloudinary' | 'r2' = 'cloudinary';

  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly r2Service: R2Service,
  ) {
    const storageProvider = process.env.STORAGE_PROVIDER || 'cloudinary';
    if (storageProvider.toLowerCase() === 'r2') {
      this.provider = 'r2';
    }
    this.logger.log(`Active storage provider: ${this.provider.toUpperCase()}`);
  }

  async upload(
    buffer: Buffer,
    folder: string,
    options?: { filename?: string; mimeType?: string; publicId?: string },
  ): Promise<{ url: string; public_id: string }> {
    if (this.provider === 'r2') {
      const extension = this.getExtensionFromMimeType(
        options?.mimeType || 'image/jpeg',
      );
      const uniqueName = options?.filename
        ? this.sanitizeFilename(options.filename)
        : `${Date.now()}-${Math.random().toString(36).substring(2, 10)}${extension}`;

      return this.r2Service.upload(
        buffer,
        folder,
        uniqueName,
        options?.mimeType || 'image/jpeg',
      );
    } else {
      // Cloudinary upload
      const uploadResult = await this.cloudinaryService.upload(
        buffer,
        folder,
        options?.publicId,
      );
      return {
        url: uploadResult.url,
        public_id: uploadResult.public_id,
      };
    }
  }

  async delete(publicId: string): Promise<any> {
    if (this.provider === 'r2') {
      return this.r2Service.delete(publicId);
    } else {
      return this.cloudinaryService.delete(publicId);
    }
  }

  private sanitizeFilename(filename: string): string {
    return filename.replace(/[^a-zA-Z0-9.\-_]/g, '_').toLowerCase();
  }

  private getExtensionFromMimeType(mimeType: string): string {
    const map: Record<string, string> = {
      'image/jpeg': '.jpg',
      'image/jpg': '.jpg',
      'image/png': '.png',
      'image/gif': '.gif',
      'image/webp': '.webp',
      'image/svg+xml': '.svg',
    };
    return map[mimeType] || '.jpg';
  }
}
