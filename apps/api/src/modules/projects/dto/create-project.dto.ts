import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsBoolean,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsOptional()
  clientName?: string;

  @IsString()
  @IsOptional()
  industry?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  techStack?: string[];

  @IsString()
  @IsOptional()
  heroImageUrl?: string;

  @IsString()
  @IsOptional()
  heroImageCloudinaryId?: string;

  @IsOptional()
  galleryImages?: any;

  @IsString()
  @IsOptional()
  problem?: string;

  @IsString()
  @IsOptional()
  solution?: string;

  @IsString()
  @IsOptional()
  results?: string;

  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @IsString()
  @IsOptional()
  metaTitle?: string;

  @IsString()
  @IsOptional()
  metaDescription?: string;

  @IsString()
  @IsOptional()
  ogImageUrl?: string;

  @IsString()
  @IsOptional()
  status?: string;
}
