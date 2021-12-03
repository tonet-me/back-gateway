import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  isArray,
  IsDefined,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  ValidateNested,
} from 'class-validator';
import { SocialTitleEnum } from '../enum/socail.title.dto';

class PhoneDTO {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  readonly order: number;
}

class SocialDTO {
  @IsDefined()
  @IsNotEmpty()
  @IsEnum(SocialTitleEnum)
  readonly title: SocialTitleEnum;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  readonly order: number;
}

class MailDTO {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  readonly content: string;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  readonly order: number;
}

class LocationDTO {
  @IsDefined()
  @IsNumber({}, { each: true })
  @ArrayMaxSize(2)
  @ArrayMinSize(2)
  readonly coordinates: number[];

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly type: string;
}

class AddressDTO {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  readonly countryId: string;

  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  readonly cityId: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => LocationDTO)
  readonly location: LocationDTO;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  readonly order: number;
}

export class AddCardDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly about: string;

  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  readonly photo: string;

  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  readonly website: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly qrcode: string;

  @IsDefined()
  @IsNotEmpty()
  // @IsString()
  @Matches(/^(?=[a-zA-Z0-9_]{5,30}$)(?!.*[.]{2})[^.].*[^.]$/, {
    message: 'username must be _ Alphabets Numbers',
  })
  readonly userName: string;

  @IsOptional()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PhoneDTO)
  @IsArray()
  readonly phones: PhoneDTO[];

  @IsOptional()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => SocialDTO)
  @IsArray()
  readonly socials: SocialDTO[];

  @IsOptional()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => MailDTO)
  @IsArray()
  readonly mails: MailDTO[];

  @IsOptional()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AddressDTO)
  @IsArray()
  readonly addresses: AddressDTO[];

  @IsOptional()
  @IsNotEmpty()
  readonly isActive: boolean = true;
}
