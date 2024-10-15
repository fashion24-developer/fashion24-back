import { Inject, Injectable, Logger } from '@nestjs/common';

import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { FancyPaginationDto } from '@src/api/apps/fancy/dtos/fancy-pagination.dto';
import { IFancyAppRepository } from '@src/api/apps/fancy/repositories/i-fancy.app.repository.interface';
import { FANCY_REPOSITORY_DI_TOKEN } from '@src/common/constants/di.tokens';
import { PaginationMetaDto } from '@src/common/dtos/pagination/pagination-meta.dto';
import { FancyEntity } from '@src/libs/fancy/entities/fancy.entity';

@Injectable()
export class FancyAppService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
    @Inject(FANCY_REPOSITORY_DI_TOKEN) private readonly fancyRepository: IFancyAppRepository
  ) {}

  async findOne(data) {
    return data;
  }

  async findAllForPagination(
    paginationData: FancyPaginationDto
  ): Promise<{ data: FancyEntity[]; meta: PaginationMetaDto }> {
    const { page, pageSize: take } = paginationData;

    const skip = take ? take * (page - 1) : 0;

    const { totalCount, data } = await this.fancyRepository.paginate(paginationData, skip);

    const totalPages = take ? Math.ceil(totalCount / take) : 1;

    const isFirstPage = page === 1 ? true : false;
    const isLastPage = page === totalPages || totalPages === 0 ? true : false;

    return {
      data,
      meta: { pageNumber: page, pageSize: take, totalPages, totalCount, isLastPage, isFirstPage }
    };
  }

  async update(data) {
    return data;
  }

  delete(): void {}
}
