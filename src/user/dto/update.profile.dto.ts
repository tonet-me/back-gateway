import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';
export class UserProfileUpdateDTO {
  @IsOptional()
  @IsString()
  readonly firstName: string;

  @IsOptional()
  @IsString()
  readonly lastName: string;

  @IsOptional()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsUrl()
  readonly profilePicture: string;
}
