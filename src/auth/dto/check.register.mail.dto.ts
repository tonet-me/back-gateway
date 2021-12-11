import { IsDefined, IsEmail } from 'class-validator';

export class CheckEmailBeforRegister {
  @IsDefined()
  @IsEmail()
  readonly email: string;
}
