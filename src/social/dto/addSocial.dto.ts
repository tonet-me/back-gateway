import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class AddSocialDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

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
