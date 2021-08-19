import { IsNotEmpty, IsString } from 'class-validator';

export class UserNameDTO {
  @IsNotEmpty()
  @IsString()
  readonly userName: string;
}
