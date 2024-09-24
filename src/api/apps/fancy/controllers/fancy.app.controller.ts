import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ApiFancyApp } from '@src/api/apps/fancy/controllers/fancy.app.swagger';
import { FindAllFancyDto } from '@src/api/apps/fancy/dtos/find-all-fancy.dto';
import { FancyAppService } from '@src/api/apps/fancy/services/fancy.app.service';
import { globalPrefix } from '@src/bootstrap.service';
import { PaginationResponseDto } from '@src/common/dtos/pagination/pagination-response.dto';
import { routesV1 } from '@src/configs/app.route';

@ApiTags('fancy')
@Controller(routesV1.version)
export class FancyAppController {
  static path = `/${globalPrefix}/${routesV1.version}/${routesV1.fancy.root}`;

  constructor(private readonly fancyService: FancyAppService) {}

  @ApiFancyApp.FindAllForPagination({ summary: 'fancy 전체 조회' })
  @Get(routesV1.fancy.findAllForPagination)
  async findAllForPagination(@Query() paginationData: FindAllFancyDto) {
    const { data, meta } = await this.fancyService.findAllForPagination(paginationData);

    return new PaginationResponseDto(data, meta);
  }
}
