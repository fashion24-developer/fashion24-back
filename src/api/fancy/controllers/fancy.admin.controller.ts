import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AdminGuard } from '@src/api/auth/jwt/jwt-auth.guard';
import { ApiFancy } from '@src/api/fancy/controllers/fancy.swagger';
import { CreateFancyDto } from '@src/api/fancy/dtos/create-fancy.dto';
import { FancyDto } from '@src/api/fancy/dtos/fancy.dto';
import { IFancyService } from '@src/api/fancy/services/i-fancy-service.interface';
import { FANCY_SERVICE_DI_TOKEN } from '@src/common/constants/di.tokens';

@ApiTags('admin fancy')
@UseGuards(AdminGuard)
@Controller('admin/fancy')
export class FancyAdminController {
  constructor(@Inject(FANCY_SERVICE_DI_TOKEN) private readonly fancyService: IFancyService) {}

  @ApiFancy.Create({ summary: 'fancy 생성' })
  @Post()
  create(@Body() fancyInfo: CreateFancyDto): Promise<FancyDto> {
    return this.fancyService.create(fancyInfo);
  }
}
