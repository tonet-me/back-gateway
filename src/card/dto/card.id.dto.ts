import { OmitType } from '@nestjs/mapped-types';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CardIdDTO {
  @IsMongoId()
  @IsNotEmpty()
  readonly cardId: string;
}

export class getOwnCardDTO {
  @IsMongoId()
  @IsNotEmpty()
  readonly _id: string;

  @IsMongoId()
  @IsNotEmpty()
  readonly userId: string;
}

export class getOwnCardsDTO extends OmitType(getOwnCardDTO, ['_id'] as const) {}
