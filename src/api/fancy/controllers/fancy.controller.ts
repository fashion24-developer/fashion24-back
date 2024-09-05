import { Body, Controller, Inject, Post } from '@nestjs/common';

import { Fancy } from '@prisma/client';

import { CreateFancyDto } from '@src/api/fancy/dtos/create-fancy.dto';
import { FancyService } from '@src/api/fancy/services/fancy.service';
import { IFancyService } from '@src/api/fancy/services/i-fancy-service.interface';

@Controller('fancy')
export class FancyController {
  constructor(@Inject(FancyService) private readonly fancyService: IFancyService) {}

  @Post()
  createFancy(@Body() fancyInfo: CreateFancyDto): Promise<Fancy> {
    return this.fancyService.create(fancyInfo);
  }
}
