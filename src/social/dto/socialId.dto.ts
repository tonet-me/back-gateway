import { IsMongoId, IsNotEmpty } from 'class-validator';

export class SocialIdDTO {
  @IsMongoId()
  @IsNotEmpty()
  readonly socialId: string;
}
