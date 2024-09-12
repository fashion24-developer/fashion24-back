import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PaginationResponseDto } from '@src/common/dtos/pagination/pagination-response.dto';

import { FindAllFancyDto } from '../dtos/find-all-fancy.dto';
import { FancyService } from '../services/fancy.service';
import { IFancyService } from '../services/i-fancy-service.interface';
import { ApiFancy } from './fancy.swagger';

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
