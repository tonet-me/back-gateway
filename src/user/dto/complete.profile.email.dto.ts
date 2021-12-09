import { IsDefined, IsOptional, IsString, IsUrl } from 'class-validator';

export class UserCompleteProfileWithEmailDTO {
  @IsDefined()
  @IsString()
  readonly fullName: string;

  @IsOptional()
  @IsUrl()
  readonly photo: string;
}
