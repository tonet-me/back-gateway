import { IsDefined, IsNumber, IsString } from 'class-validator';
export class MakeOtpDTO {
  @IsDefined()
  @IsString()
  readonly phoneNumber: string;
}

export class LoginOtpDTO {
  @IsDefined()
  @IsString()
  readonly phoneNumber: string;

  @IsDefined()
  @IsNumber()
  readonly code: number;
}
