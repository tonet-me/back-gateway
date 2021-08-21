import { OmitType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  ValidateNested,
} from 'class-validator';
export enum UserStatusEnum {
  REGISTERED = 'REGISTERED',
  COMPLETED = 'COMPLETED',
}

class ContactDTO {
  @IsOptional()
  @IsString()
  readonly phone: string;

  @IsOptional()
  @IsString()
  readonly fax: string;

  @IsOptional()
  @IsString()
  readonly address: string;
}

export class UserUpdateDTO {
  @IsOptional()
  @IsString()
  readonly fullName: string;

  @IsOptional()
  @IsString()
  readonly title: string;

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

  @IsOptional()
  @ValidateNested({
    each: true,
  })
  @Type(() => ContactDTO)
  readonly contact: ContactDTO;
}

export class UserUpdateLimitDTO extends OmitType(UserUpdateDTO, [
  'status',
  'emailVerify',
  'mobile',
  'isActive',
] as const) {}

export class UserCompleteProfile {
  @IsDefined()
  @IsString()
  readonly fullName: string;

  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsUrl()
  readonly profilePicture: string;

  @IsDefined()
  @IsString()
  @Matches(/^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/)
  readonly userName: string;
}
