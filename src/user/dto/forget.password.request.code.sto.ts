import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';

export class ForgetPasswordRequestCodeDTO {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
