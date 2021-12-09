import { OmitType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';
import { Match } from 'src/common/decorator/match.decorator';
export enum UserStatusEnum {
  REGISTERED = 'registered',
  COMPLETED = 'completed',
}

export class UserUpdateDTO {
  @IsOptional()
  @IsString()
  readonly fullName: string;

  @IsString()
  @IsOptional()
  readonly mobile: string;

  @IsEmail()
  @IsOptional()
  readonly email: string;

  @IsEmail()
  @IsOptional()
  readonly emailVerify: string;

  @IsBoolean()
  @IsOptional()
  readonly verified: boolean;

  @IsUrl()
  @IsOptional()
  readonly photo: string;

  @IsBoolean()
  @IsOptional()
  readonly isActive: boolean;

  @IsEnum(UserStatusEnum)
  @IsOptional()
  readonly status: UserStatusEnum;
}

export class UserUpdateLimitDTO extends OmitType(UserUpdateDTO, [
  'status',
  'emailVerify',
  'mobile',
  'isActive',
  'verified',
] as const) {}

export class UserCompleteProfile {
  @IsDefined()
  @IsString()
  readonly fullName: string;

  @IsOptional()
  @IsUrl()
  readonly photo: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @Match('password')
  @MinLength(8)
  readonly rePassword: string;
}
