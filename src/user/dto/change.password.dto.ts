import { IsDefined, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDTO {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly oldPassword: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly newPassword: string;
}
