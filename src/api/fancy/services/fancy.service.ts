import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';

import { nanoid } from 'nanoid';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { FANCY_FIND_ALL_SELECT } from '@src/api/fancy/constants/fancy-find-all-select.const';
import { CreateFancyInputDto } from '@src/api/fancy/dtos/create-fancy-input.dto';
import { FindAllFancyDto } from '@src/api/fancy/dtos/find-all-fancy.dto';
import { FancyEntity } from '@src/api/fancy/entity/fancy.entity';
import { IFancyRepository } from '@src/api/fancy/repositories/i-fancy-repository.interface';
import { FANCY_REPOSITORY_DI_TOKEN } from '@src/common/constants/di.tokens';
import { PaginationResponseDto } from '@src/common/dtos/pagination/pagination-response.dto';
import { FancyMapper } from '@src/utils/mappers/fancy.mapper';

@Injectable()
export class FancyService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
    @Inject(FANCY_REPOSITORY_DI_TOKEN) private readonly fancyRepository: IFancyRepository
  ) {}

  async create(fancyData: CreateFancyInputDto): Promise<FancyEntity> {
    try {
      const id = nanoid();
      const price = this.calculatePrice(fancyData.costPrice, fancyData.discountRate);

      return this.fancyRepository.create(new FancyEntity({ id, price, ...fancyData }));
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Failed to create fancy', HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    }
  }

  async findOne(data) {
    return data;
  }

  async findAllForPagination(
    paginationData: FindAllFancyDto
  ): Promise<PaginationResponseDto<FancyEntity>> {
    try {
      const { page, pageSize: take, orderBy, orderDirection, ...where } = paginationData;

      const totalCount = await this.fancyRepository.count(FancyMapper.paginationWhere(where));
      const totalPages = take ? Math.ceil(totalCount / take) : 1;

      const isFirstPage = page === 1 ? true : false;
      const isLastPage = page === totalPages ? true : false;

      const skip = take ? take * (page - 1) : 0;

      const data = await this.fancyRepository.findAllForPagination(
        FancyMapper.paginationWhere(where),
        FANCY_FIND_ALL_SELECT,
        take,
        skip,
        { [orderBy]: orderDirection }
      );

      return {
        data,
        meta: { pageNumber: page, pageSize: take, totalPages, totalCount, isLastPage, isFirstPage }
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Failed to find fancy', HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    }
  }

  async update(data) {
    return data;
  }

  delete(): void {}

  private calculatePrice(costPrice: number, discountRate: number): number {
    const price = costPrice * (1 - discountRate / 100);
    return Math.ceil(price);
  }
}
