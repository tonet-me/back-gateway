import { OmitType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { UpdateSocialDto } from 'src/social/dto/updateSocial.dto';
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
] as const) {}
