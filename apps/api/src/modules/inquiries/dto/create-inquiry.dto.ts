import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateInquiryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  companyName?: string;

  @IsString()
  @IsOptional()
  serviceInterested?: string;

  @IsString()
  @IsOptional()
  budgetRange?: string;

  @IsString()
  @IsOptional()
  timeline?: string;

  @IsString()
  @IsOptional()
  message?: string;

  @IsString()
  @IsNotEmpty()
  recaptchaToken: string;
}
