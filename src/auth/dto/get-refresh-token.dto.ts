import { IsDefined, IsString } from 'class-validator';

export class GetRefreshTokenOtpDTO {
  @IsDefined()
  @IsString()
  readonly refreshToken: string;
}
