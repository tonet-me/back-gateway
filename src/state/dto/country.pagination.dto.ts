import { Type } from 'class-transformer';
import {
  IsDefined,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PaginateDTO } from 'src/common/dto/pagination.dto';

class FilterDto {
  @IsString()
  @IsOptional()
  readonly name: string;
}

export class CountryQueryResolversDTO extends PaginateDTO {
  @ValidateNested({
    each: true,
  })
  @Type(() => FilterDto)
  @IsDefined({})
  readonly filters: FilterDto | Object = {};
}
