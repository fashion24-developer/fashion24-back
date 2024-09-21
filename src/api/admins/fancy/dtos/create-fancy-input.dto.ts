import { OmitType } from '@nestjs/swagger';

import { CreateFancyDto } from '@src/api/admins/fancy/dtos/create-fancy.dto';

export class CreateFancyInputDto extends OmitType(CreateFancyDto, ['id', 'price']) {}
