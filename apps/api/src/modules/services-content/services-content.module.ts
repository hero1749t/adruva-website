import { Module } from '@nestjs/common';
import { ServicesContentController } from './services-content.controller';
import { ServicesContentService } from './services-content.service';

@Module({
  controllers: [ServicesContentController],
  providers: [ServicesContentService],
  exports: [ServicesContentService],
})
export class ServicesContentModule {}
