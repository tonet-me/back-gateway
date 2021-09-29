import { Type } from 'class-transformer';
import {
  IsDefined,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PaginateDTO } from 'src/common/dto/pagination.dto';

class OsDTO {
  @IsString()
  @IsOptional()
  readonly name: string;
}

class FilterDto {
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => OsDTO)
  readonly os: OsDTO;
}

export class ViewCardQueryResolversDTO extends PaginateDTO {
  @ValidateNested({
    each: true,
  })
  @Type(() => FilterDto)
  @IsDefined({})
  readonly filters: FilterDto | Object = {};
}
