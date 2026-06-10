import {
  IsString,
  IsOptional,
  IsArray,
  IsInt,
  IsNotEmpty,
} from 'class-validator';

export class UpdateBlogDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  coverImageUrl?: string;

  @IsString()
  @IsOptional()
  coverImageCloudinaryId?: string;

  @IsString()
  @IsOptional()
  authorId?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsString()
  @IsOptional()
  metaTitle?: string;

  @IsString()
  @IsOptional()
  metaDescription?: string;

  @IsString()
  @IsOptional()
  ogImageUrl?: string;

  @IsNotEmpty()
  @IsOptional()
  content?: any;

  @IsInt()
  @IsOptional()
  readingTimeMinutes?: number;

  @IsString()
  @IsOptional()
  status?: string;
}
