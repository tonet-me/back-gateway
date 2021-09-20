import { IsDefined, IsNumber, Matches } from 'class-validator';
export class MakeOtpDTO {
  @Matches(/^\+989[0-9]\d{8}$/)
  @IsDefined()
  readonly phoneNumber: string;
}

export class LoginOtpDTO {
  @IsDefined()
  @Matches(/^\+989[0-9]\d{8}$/)
  readonly phoneNumber: string;

  @IsDefined()
  @IsNumber()
  readonly code: number;
}
