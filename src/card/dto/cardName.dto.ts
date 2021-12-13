import { PickType } from '@nestjs/mapped-types';
import { AddCardDto } from './add.card.dto';

export class CardNameDTO extends PickType(AddCardDto, ['userName']) {}
