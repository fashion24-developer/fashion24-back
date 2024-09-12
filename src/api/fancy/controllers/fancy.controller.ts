import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ApiFancy } from '@src/api/fancy/controllers/fancy.swagger';
import { FindAllFancyDto } from '@src/api/fancy/dtos/find-all-fancy.dto';
import { IFancyService } from '@src/api/fancy/services/i-fancy-service.interface';
import { FANCY_SERVICE_DI_TOKEN } from '@src/common/constants/di.tokens';
import { PaginationResponseDto } from '@src/common/dtos/pagination/pagination-response.dto';

@ApiTags('fancy')
@Controller('fancy')
export class FancyController {
  constructor(@Inject(FANCY_SERVICE_DI_TOKEN) private readonly fancyService: IFancyService) {}

  @ApiFancy.FindAll({ summary: 'fancy 전체 조회' })
  @Get()
  async findAll(@Query() paginationData: FindAllFancyDto) {
    const { data, meta } = await this.fancyService.findAll(paginationData);

    return new PaginationResponseDto(data, meta);
  }
}
