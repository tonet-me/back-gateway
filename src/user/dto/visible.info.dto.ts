import { IsBoolean, IsOptional } from 'class-validator';

export class VisibleInfoDTO {
  @IsBoolean()
  @IsOptional()
  readonly mobileVisible: boolean;

  @IsBoolean()
  @IsOptional()
  readonly emailVisible: boolean;
}
