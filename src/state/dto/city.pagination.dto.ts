import { Type } from 'class-transformer';
import {
  IsDefined,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PaginateDTO } from 'src/common/dto/pagination.dto';

class FilterDto {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsMongoId()
  @IsOptional()
  readonly countryId: string;
}

export class CityQueryResolversDTO extends PaginateDTO {
  @ValidateNested({
    each: true,
  })
  @Type(() => FilterDto)
  @IsDefined({})
  readonly filters: FilterDto | Object = {};
}
