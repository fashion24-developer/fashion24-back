import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ApiFancy } from '@src/api/fancy/controllers/fancy.swagger';
import { FindAllFancyDto } from '@src/api/fancy/dtos/find-all-fancy.dto';
import { FancyService } from '@src/api/fancy/services/fancy.service';
import { IFancyService } from '@src/api/fancy/services/i-fancy-service.interface';
import { PaginationResponseDto } from '@src/common/dtos/pagination/pagination-response.dto';

@ApiTags('fancy')
@Controller('fancy')
export class FancyController {
  constructor(@Inject(FancyService) private readonly fancyService: IFancyService) {}

  @ApiFancy.FindAll({ summary: 'fancy 전체 조회' })
  @Get()
  async findAll(@Query() paginationData: FindAllFancyDto) {
    const { data, meta } = await this.fancyService.findAll(paginationData);

    return new PaginationResponseDto(data, meta);
  }
}
