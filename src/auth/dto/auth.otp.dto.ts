import { IsDefined, IsString } from 'class-validator';
export class AuthOtpDTO {
  @IsDefined()
  @IsString()
  readonly phoneNumber: string;
}
