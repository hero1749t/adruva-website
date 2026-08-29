import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from '../../common/storage/storage.service';
import { memoryStorage } from 'multer';

@Controller('upload')
export class UploadController {
  constructor(private readonly storageService: StorageService) {}

  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
      fileFilter: (_req, file, cb) => {
        const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowed.includes(file.mimetype)) {
          return cb(
            new BadRequestException(
              'Only JPG, PNG, WebP, GIF images are allowed',
            ),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder: string = 'general',
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    // Sanitize folder — only allow known folders
    const allowedFolders = ['blogs', 'projects', 'team', 'og', 'general'];
    const safeFolder = allowedFolders.includes(folder) ? folder : 'general';

    const result = await this.storageService.upload(file.buffer, safeFolder, {
      filename: file.originalname,
      mimeType: file.mimetype,
    });

    return {
      success: true,
      data: {
        url: result.url,
        public_id: result.public_id,
      },
    };
  }
}
