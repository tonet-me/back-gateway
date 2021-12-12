import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class ForgetPasswordConformDTO {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;

  @IsDefined()
  @IsNumber()
  readonly code: number;
}
