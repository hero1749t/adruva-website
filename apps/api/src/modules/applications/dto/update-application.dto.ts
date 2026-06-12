import { IsString, IsOptional, IsInt, Max, Min } from 'class-validator';

export class UpdateApplicationDto {
  @IsString()
  @IsOptional()
  status?: string;

  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  internalRating?: number;

  @IsString()
  @IsOptional()
  adminNotes?: string;

  @IsString()
  @IsOptional()
  reviewedBy?: string;
}
