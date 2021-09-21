import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class PaginateDTO {
  @IsInt()
  @Type(() => Number)
  @Min(1)
  readonly page: number = 1;

  @IsInt()
  @Type(() => Number)
  @Min(1)
  readonly limit: number = 10;
}
