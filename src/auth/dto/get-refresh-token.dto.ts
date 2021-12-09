import { IsDefined, IsString } from 'class-validator';

export class GetRefreshTokenDTO {
  @IsDefined()
  @IsString()
  readonly refreshToken: string;
}
