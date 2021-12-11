import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginWithEmailDTO {
  @IsDefined()
  @IsEmail()
  readonly email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
