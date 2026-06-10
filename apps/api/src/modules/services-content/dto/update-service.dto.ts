import {
  IsString,
  IsOptional,
  IsArray,
  IsBoolean,
  IsInt,
} from 'class-validator';

export class UpdateServiceDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  tagline?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  benefits?: any;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  whatsIncluded?: string[];

  @IsOptional()
  processSteps?: any;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  techStack?: string[];

  @IsString()
  @IsOptional()
  startingPrice?: string;

  @IsOptional()
  faq?: any;

  @IsString()
  @IsOptional()
  metaTitle?: string;

  @IsString()
  @IsOptional()
  metaDescription?: string;

  @IsString()
  @IsOptional()
  ogImageUrl?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsInt()
  @IsOptional()
  sortOrder?: number;
}
