import { IsEmail, IsNotEmpty } from 'class-validator';

export class GoogleVerifyDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
