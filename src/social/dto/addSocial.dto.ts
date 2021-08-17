import {
  IsBoolean,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export enum SocialTitleEnum {
  INSTAGRAM = 'instagram',
  TWEETER = 'tweeter',
  YOUTUBE = 'youtube',
  WHATSAPP = 'whatsApp',
  TELEGRAM = 'telegram',
  LINKEDIN = 'linkedin',
}
export class AddSocialDto {
  @IsDefined()
  @IsEnum(SocialTitleEnum)
  @IsNotEmpty()
  readonly title: SocialTitleEnum;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly icon: string;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  readonly isActive: boolean = true;
}
