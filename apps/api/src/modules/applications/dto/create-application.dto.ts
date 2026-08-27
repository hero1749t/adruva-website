import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  jobId: string;

  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  currentLocation: string;

  @IsString()
  @IsNotEmpty()
  qualification: string;

  @IsString()
  @IsNotEmpty()
  experienceLevel: string;

  @IsString()
  @IsOptional()
  resumeUrl?: string;

  @IsString()
  @IsOptional()
  portfolioUrl?: string;

  @IsString()
  @IsOptional()
  linkedinUrl?: string;

  @IsString()
  @IsNotEmpty()
  coverLetter: string;

  @IsString()
  @IsNotEmpty()
  whyJoin: string;

  @IsString()
  @IsNotEmpty()
  referralSource: string;

  @IsString()
  @IsOptional()
  recaptchaToken?: string;
}
