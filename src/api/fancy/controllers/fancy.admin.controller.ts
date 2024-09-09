import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Fancy } from '@prisma/client';

import { ApiFancy } from '@src/api/fancy/controllers/fancy.swagger';
import { CreateFancyDto } from '@src/api/fancy/dtos/create-fancy.dto';
import { FancyService } from '@src/api/fancy/services/fancy.service';
import { IFancyService } from '@src/api/fancy/services/i-fancy-service.interface';

@ApiTags('admin fancy')
@Controller('admin/fancy')
export class FancyAdminController {
  constructor(@Inject(FancyService) private readonly fancyService: IFancyService) {}

  @ApiFancy.Create({ summary: 'fancy 생성' })
  @Post()
  create(@Body() fancyInfo: CreateFancyDto): Promise<Fancy> {
    return this.fancyService.create(fancyInfo);
  }
}
