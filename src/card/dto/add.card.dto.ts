import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
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
import { SensitiveUsername } from 'src/common/decorator/sensitive.username.decorator';
import { ToLowerCase } from 'src/common/decorator/toLowerCase.decorator';
import { CardLanguageEnum } from '../enum/card.language.dto';
import { CardSocialTitleEnum } from '../enum/card.socail.title.dto';

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
  @IsEnum(CardSocialTitleEnum)
  readonly title: CardSocialTitleEnum;

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
  @SensitiveUsername('userName')
  @ToLowerCase('userName')
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

  @IsDefined()
  @IsNotEmpty()
  @IsEnum(CardLanguageEnum)
  readonly language: CardLanguageEnum;
}
