import { OmitType, PartialType } from '@nestjs/mapped-types';
import { AddCardDto } from './add.card.dto';

export class UpdateCardDto extends PartialType(AddCardDto) {
  // OmitType(AddCardDto, ['name', 'userName'] as const),)
}
