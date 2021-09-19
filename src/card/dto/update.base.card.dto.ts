import { PickType } from '@nestjs/mapped-types';
import { AddCardDto } from './add.card.dto';

export class UpdateBasicInfoCardDto extends PickType(AddCardDto, [
  'name',
  'userName',
  'title',
  'about',
  'photo',
] as const) {}
