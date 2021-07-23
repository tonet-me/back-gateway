import {
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength,
} from 'class-validator';
import { Match } from 'src/common/decorator/match.decorator';
export class RegisterDTO {
  @IsDefined()
  @IsString()
  readonly firstName: string;

  @IsDefined()
  @IsString()
  readonly lastName: string;

  @IsDefined()
  @MinLength(8)
  @IsString()
  readonly password: string;

  @IsDefined()
  @MinLength(8)
  @IsString()
  @Match('password')
  readonly rePassword: string;

  @IsDefined()
  @IsEmail()
  readonly email: string;

  @Matches(/^0[0-9]\d{9}$/)
  @IsDefined()
  readonly mobile: string;

  @IsOptional()
  @IsUrl()
  readonly profilePhoto: string;
}
