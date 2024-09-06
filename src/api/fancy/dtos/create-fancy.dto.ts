import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';

import { FancyDto } from '@src/api/fancy/dtos/fancy.dto';

export class CreateFancyDto extends OmitType(FancyDto, ['id', 'price', 'createdAt', 'updatedAt']) {}
