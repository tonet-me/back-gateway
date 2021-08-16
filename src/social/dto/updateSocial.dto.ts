import { PartialType } from '@nestjs/mapped-types';
import { AddSocialDto } from './addSocial.dto';

export class UpdateSocialDto extends PartialType(AddSocialDto) {}
