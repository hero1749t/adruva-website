import {
  IsString,
  IsOptional,
  IsArray,
  IsInt,
  IsBoolean,
} from 'class-validator';

export class UpdateJobDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  department?: string;

  @IsString()
  @IsOptional()
  locationType?: string;

  @IsString()
  @IsOptional()
  experienceLevel?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  responsibilities?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  requirements?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  skillsRequired?: string[];

  @IsInt()
  @IsOptional()
  salaryMin?: number;

  @IsInt()
  @IsOptional()
  salaryMax?: number;

  @IsString()
  @IsOptional()
  salaryLabel?: string;

  @IsBoolean()
  @IsOptional()
  isPaid?: boolean;

  @IsString()
  @IsOptional()
  duration?: string;

  @IsInt()
  @IsOptional()
  openingsCount?: number;

  @IsString()
  @IsOptional()
  applicationDeadline?: string;

  @IsOptional()
  processSteps?: any;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  perks?: string[];

  @IsString()
  @IsOptional()
  status?: string;
}
