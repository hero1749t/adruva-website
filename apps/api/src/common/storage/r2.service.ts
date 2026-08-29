import { Injectable, Logger } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';

@Injectable()
export class R2Service {
  private readonly logger = new Logger(R2Service.name);
  private s3Client: S3Client | null = null;
  private bucketName = '';
  private customDomain = '';

  constructor() {
    const accountId = process.env.R2_ACCOUNT_ID;
    const accessKeyId = process.env.R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
    this.bucketName = process.env.R2_BUCKET_NAME || '';
    this.customDomain = process.env.R2_PUBLIC_CUSTOM_DOMAIN || '';

    if (accountId && accessKeyId && secretAccessKey && this.bucketName) {
      this.s3Client = new S3Client({
        endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
        region: 'auto',
      });
      this.logger.log('Cloudflare R2 storage provider initialized.');
    } else {
      this.logger.warn(
        'Cloudflare R2 environment variables not configured. Uploads will be mocked.',
      );
    }
  }

  async upload(
    buffer: Buffer,
    folder: string,
    filename: string,
    mimeType: string,
  ): Promise<{ url: string; public_id: string }> {
    const key = `adruva-website/${folder}/${filename}`;

    if (!this.s3Client) {
      this.logger.log(`Mock Uploading to Cloudflare R2: ${key}`);
      const mockUrl = this.customDomain
        ? `${this.customDomain.replace(/\/$/, '')}/${key}`
        : `https://pub-mock-r2-dev.r2.dev/${key}`;
      return {
        url: mockUrl,
        public_id: key,
      };
    }

    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: buffer,
        ContentType: mimeType,
      });

      await this.s3Client.send(command);

      const url = this.customDomain
        ? `${this.customDomain.replace(/\/$/, '')}/${key}`
        : `https://${this.bucketName}.${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${key}`; // Fallback

      return {
        url,
        public_id: key,
      };
    } catch (error) {
      this.logger.error(
        `Cloudflare R2 upload failed: ${(error as Error).message}`,
      );
      throw error;
    }
  }

  async delete(key: string): Promise<any> {
    if (!this.s3Client) {
      this.logger.log(`Mock Deleting from Cloudflare R2: ${key}`);
      return { result: 'ok' };
    }

    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      await this.s3Client.send(command);
      return { result: 'ok' };
    } catch (error) {
      this.logger.error(
        `Cloudflare R2 delete failed: ${(error as Error).message}`,
      );
      throw error;
    }
  }
}
