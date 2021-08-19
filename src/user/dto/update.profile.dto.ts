import { OmitType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
} from 'class-validator';
export enum UserStatusEnum {
  REGISTERED = 'REGISTERED',
  COMPLETED = 'COMPLETED',
}
export class UserUpdateDTO {
  @IsOptional()
  @IsString()
  readonly firstName: string;

  @IsOptional()
  @IsString()
  readonly lastName: string;

  @IsOptional()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  @Matches(/^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/)
  readonly userName: string;

  @IsOptional()
  @IsUrl()
  readonly profilePicture: string;

  @IsOptional()
  @IsString()
  readonly mobile: string;

  @IsOptional()
  @IsBoolean()
  readonly isActive: boolean;

  @IsOptional()
  @IsBoolean()
  readonly emailVerify: boolean;

  @IsOptional()
  @IsEnum(UserStatusEnum)
  readonly status: UserStatusEnum;
}

export class UserUpdateLimitDTO extends OmitType(UserUpdateDTO, [
  'status',
  'emailVerify',
  'mobile',
  'email',
  'isActive',
] as const) {}

export class UserCompleteProfile {
  @IsDefined()
  @IsString()
  readonly firstName: string;

  @IsDefined()
  @IsString()
  readonly lastName: string;

  @IsOptional()
  @IsUrl()
  readonly profilePicture: string;

  @IsDefined()
  @IsString()
  @Matches(/^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/)
  readonly userName: string;
}
