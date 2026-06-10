import { Injectable, Logger } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);

  constructor() {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (cloudName && apiKey && apiSecret && cloudName !== 'dummy_cloud_name') {
      cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
      });
    } else {
      this.logger.warn(
        'Cloudinary environment variables not configured. Uploads will be mocked.',
      );
    }
  }

  async upload(
    buffer: Buffer,
    folder: string,
    publicId?: string,
  ): Promise<UploadApiResponse | { url: string; public_id: string }> {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    if (!cloudName || cloudName === 'dummy_cloud_name') {
      this.logger.log(
        `Mock Uploading to Cloudinary folder: adruva-website/${folder}`,
      );
      return {
        url: `https://res.cloudinary.com/dummy/image/upload/v12345/adruva-website/${folder}/${
          publicId || 'mock_image_id'
        }.jpg`,
        public_id: `adruva-website/${folder}/${publicId || 'mock_image_id'}`,
      };
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `adruva-website/${folder}`,
          public_id: publicId,
          overwrite: true,
          transformation: [{ quality: 'auto', fetch_format: 'auto' }],
        },
        (error, result) => {
          if (error) {
            this.logger.error(`Cloudinary upload failed: ${error.message}`);
            reject(new Error(error.message));
          } else {
            resolve(result!);
          }
        },
      );
      uploadStream.end(buffer);
    });
  }

  async delete(publicId: string): Promise<any> {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    if (!cloudName || cloudName === 'dummy_cloud_name') {
      this.logger.log(`Mock Deleting from Cloudinary: ${publicId}`);
      return { result: 'ok' };
    }

    try {
      const response = (await cloudinary.uploader.destroy(publicId)) as Record<
        string,
        unknown
      >;
      return response;
    } catch (error) {
      this.logger.error(
        `Cloudinary delete failed: ${(error as Error).message}`,
      );
      throw error;
    }
  }
}
