import { OmitType } from '@nestjs/swagger';

import { FancyDto } from '@src/api/fancy/dtos/fancy.dto';

export class CreateFancyDto extends OmitType(FancyDto, ['createdAt', 'updatedAt']) {}
