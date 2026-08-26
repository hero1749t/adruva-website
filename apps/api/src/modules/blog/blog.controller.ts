import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('category') category?: string,
    @Query('status') status?: string,
    @Query('search') search?: string,
    @Query('language') language?: string,
    @Query('sort') sort?: string,
  ) {
    return this.blogService.findAll({
      page,
      limit,
      category,
      status,
      search,
      language,
      sort,
    });
  }

  @Get(':param')
  async findOne(@Param('param') param: string) {
    const isUuid =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        param,
      );
    if (isUuid) {
      return this.blogService.findOne(param);
    }
    return this.blogService.findOneBySlug(param);
  }

  @Post()
  async create(@Body() dto: CreateBlogDto) {
    return this.blogService.create(dto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateBlogDto) {
    return this.blogService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.blogService.delete(id);
  }

  @Patch(':id/publish')
  async togglePublish(@Param('id') id: string) {
    return this.blogService.togglePublish(id);
  }

  @Post(':id/view')
  async incrementViews(@Param('id') id: string) {
    return this.blogService.incrementViews(id);
  }

  @Post(':id/like')
  async incrementLikes(@Param('id') id: string) {
    return this.blogService.incrementLikes(id);
  }

  @Patch(':id/pin')
  async togglePin(
    @Param('id') id: string,
    @Body('isPinned') isPinned?: boolean,
    @Body('pinOrder') pinOrder?: number,
  ) {
    return this.blogService.togglePin(id, { isPinned, pinOrder });
  }

  @Post(':id/translate')
  async autoTranslate(
    @Param('id') id: string,
    @Body('languages') languages: string[],
  ) {
    return this.blogService.autoTranslate(id, languages);
  }
}
