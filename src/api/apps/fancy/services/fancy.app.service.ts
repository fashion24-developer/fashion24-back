import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';

import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { FANCY_FIND_ALL_SELECT } from '@src/api/apps/fancy/constants/fancy-find-all-select.const';
import { FindAllFancyResponseDto } from '@src/api/apps/fancy/dtos/find-all-fancy-response.dto';
import { FindAllFancyDto } from '@src/api/apps/fancy/dtos/find-all-fancy.dto';
import { IFancyAppRepository } from '@src/api/apps/fancy/repositories/i-fancy.app.repository.interface';
import { FANCY_REPOSITORY_DI_TOKEN } from '@src/common/constants/di.tokens';
import { PaginationResponseDto } from '@src/common/dtos/pagination/pagination-response.dto';
import { FancyEntity } from '@src/libs/fancy/entities/fancy.entity';
import { FancyMapper } from '@src/utils/mappers/fancy.mapper';

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
    paginationData: FindAllFancyDto
  ): Promise<PaginationResponseDto<FindAllFancyResponseDto>> {
    try {
      const { page, pageSize: take, orderBy, orderDirection, ...where } = paginationData;

      const totalCount = await this.fancyRepository.count(FancyMapper.paginationWhere(where));
      const totalPages = take ? Math.ceil(totalCount / take) : 1;

      const isFirstPage = page === 1 ? true : false;
      const isLastPage = page === totalPages ? true : false;

      const skip = take ? take * (page - 1) : 0;

      const data = (
        await this.fancyRepository.findAllForPagination(
          FancyMapper.paginationWhere(where),
          FANCY_FIND_ALL_SELECT,
          take,
          skip,
          { [orderBy]: orderDirection }
        )
      ).map((fancy) => this.reformatData(fancy));

      return {
        data,
        meta: { pageNumber: page, pageSize: take, totalPages, totalCount, isLastPage, isFirstPage }
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Failed to find fancy', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(data) {
    return data;
  }

  delete(): void {}

  private reformatData(data: FancyEntity) {
    const subOptionMap = new Map();

    data.fancySubOptions.forEach((fancySubOption) => {
      const optionId = fancySubOption.subOption.optionId;

      if (!subOptionMap.has(optionId)) {
        subOptionMap.set(optionId, []);
      }

      subOptionMap.get(optionId).push(fancySubOption.subOption);
    });

    const transformedOptions = data.fancyOptions.map((fancyOption) => {
      return {
        id: fancyOption.option.id,
        name: fancyOption.option.name,
        subOptions: subOptionMap.get(fancyOption.option.id) || []
      };
    });

    return {
      id: data.id,
      name: data.name,
      price: data.price,
      costPrice: data.costPrice,
      discountRate: data.discountRate,
      status: data.status,
      fancyImages: data.fancyImages,
      fancyOptions: transformedOptions,
      looks: data.looks,
      tags: data.tags
    };
  }
}
