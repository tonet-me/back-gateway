import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterWithEmailDTO {
  @IsDefined()
  @IsEmail()
  readonly email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly code: number;
}
