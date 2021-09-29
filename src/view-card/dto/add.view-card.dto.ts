import { Type } from 'class-transformer';
import {
  IsDefined,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class BrowserDTO {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly version: string;

  @IsOptional()
  @IsString()
  readonly major: string;
}

class EngineDTO {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly version: string;
}

class OSDTO {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly version: string;
}

class DeviceDTO {
  @IsOptional()
  @IsString()
  readonly vendor: string;

  @IsOptional()
  @IsString()
  readonly model: string;

  @IsOptional()
  @IsString()
  readonly type: string;
}

class CPUDTO {
  @IsOptional()
  @IsString()
  readonly architecture: string;
}

export class AddViewCardDto {
  @IsDefined()
  @IsMongoId()
  readonly cardId: string;

  @IsOptional()
  @IsString()
  readonly ua: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => BrowserDTO)
  readonly browser: BrowserDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => EngineDTO)
  readonly engine: EngineDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => OSDTO)
  readonly os: OSDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => DeviceDTO)
  readonly device: DeviceDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CPUDTO)
  readonly cpu: CPUDTO;
}
