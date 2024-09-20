import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AccessTokenAuthGuard } from '@src/api/auth/jwt/jwt-auth.guard';
import { ApiFancyDefault } from '@src/api/fancy/controllers/fancy-default.swagger';
import { FindAllFancyResponseDto } from '@src/api/fancy/dtos/find-all-fancy-response.dto';
import { FindAllFancyDto } from '@src/api/fancy/dtos/find-all-fancy.dto';
import { FancyService } from '@src/api/fancy/services/fancy.service';
import { globalPrefix } from '@src/bootstrap.service';
import { PaginationResponseDto } from '@src/common/dtos/pagination/pagination-response.dto';
import { routesV1 } from '@src/configs/app.route';

@UseGuards(AccessTokenAuthGuard)
@ApiTags('fancy')
@Controller(routesV1.version)
export class FancyController {
  static path = `/${globalPrefix}/${routesV1.version}/${routesV1.fancy.root}`;

  constructor(private readonly fancyService: FancyService) {}

  @ApiFancyDefault.FindAllForPagination({ summary: 'fancy 전체 조회' })
  @Get(routesV1.fancy.findAllForPagination)
  async findAllForPagination(@Query() paginationData: FindAllFancyDto) {
    const { data, meta } = await this.fancyService.findAllForPagination(paginationData);

    return new PaginationResponseDto(
      data.map((data) => {
        return new FindAllFancyResponseDto(data);
      }),
      meta
    );
  }
}
