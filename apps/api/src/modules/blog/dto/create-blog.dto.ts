import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsInt,
} from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

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
  content: any;

  @IsInt()
  @IsOptional()
  readingTimeMinutes?: number;

  @IsString()
  @IsOptional()
  status?: string;
}
