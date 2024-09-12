import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { nanoid } from 'nanoid';

import { FANCY_FIND_ALL_SELECT } from '@src/api/fancy/constants/fancy-find-all-select.const';
import { CreateFancyInputDto } from '@src/api/fancy/dtos/create-fancy-input.dto';
import { CreateFancyDto } from '@src/api/fancy/dtos/create-fancy.dto';
import { FancyDto } from '@src/api/fancy/dtos/fancy.dto';
import { FindAllFancyDto } from '@src/api/fancy/dtos/find-all-fancy.dto';
import { IFancyRepository } from '@src/api/fancy/repositories/i-fancy-repository.interface';
import { IFancyService } from '@src/api/fancy/services/i-fancy-service.interface';
import { FANCY_REPOSITORY_DI_TOKEN } from '@src/common/constants/di.tokens';
import { IPaginationMeta } from '@src/common/interfaces/pagination/i-pagination-meta.interface';

@Injectable()
export class FancyService implements IFancyService {
  constructor(
    @Inject(FANCY_REPOSITORY_DI_TOKEN) private readonly fancyRepository: IFancyRepository
  ) {}

  async create(fancyData: CreateFancyInputDto): Promise<FancyDto> {
    try {
      const id = nanoid();
      const price = this.calculatePrice(fancyData.costPrice, fancyData.discountRate);
      const createFancyData: CreateFancyDto = { ...fancyData, id, price };

      return this.fancyRepository.create(createFancyData);
    } catch (error) {
      console.error(error);
      throw new HttpException('Failed to create fancy', HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    }
  }

  async findOne(data) {
    return data;
  }

  async findAll(
    paginationData: FindAllFancyDto
  ): Promise<{ data: FancyDto[]; meta: IPaginationMeta }> {
    const { page, pageSize, orderBy, orderDirection, ...whereInput } = paginationData;

    const where = this.findAllWhere(whereInput);

    const totalCount = await this.fancyRepository.count({ where });
    const totalPages = pageSize ? Math.ceil(totalCount / pageSize) : 1;

    const isFirstPage = page === 1 ? true : false;
    const isLastPage = page === totalPages ? true : false;

    const skip = pageSize ? pageSize * (page - 1) : 0;

    const data = await this.fancyRepository.findAll({
      select: { ...FANCY_FIND_ALL_SELECT },
      take: pageSize,
      skip,
      where,
      orderBy: { [orderBy]: orderDirection }
    });

    return {
      data,
      meta: { pageNumber: page, pageSize, totalPages, totalCount, isLastPage, isFirstPage }
    };
  }

  async update(data) {
    return data;
  }

  delete(): void {}

  private calculatePrice(costPrice: number, discountRate: number): number {
    const price = costPrice * (1 - discountRate / 100);
    return Math.ceil(price);
  }

  private findAllWhere(
    data: Omit<FindAllFancyDto, 'page' | 'pageSize' | 'orderBy' | 'orderDirection'>
  ): Prisma.FancyWhereInput {
    const { name, status, optionName, subOptionName, lookName, tagName } = data;

    return {
      name: { contains: name },
      status,
      AND: [
        ...(optionName
          ? optionName.map((id) => ({
              fancyOptions: {
                some: {
                  option: {
                    id
                  }
                }
              }
            }))
          : []),
        ...(subOptionName
          ? subOptionName.map((id) => ({
              fancySubOptions: {
                some: {
                  subOption: {
                    id
                  }
                }
              }
            }))
          : []),
        ...(lookName ? lookName.map((id) => ({ looks: { some: { id } } })) : []),
        ...(tagName ? tagName.map((id) => ({ tags: { some: { id } } })) : [])
      ]
    };
  }
}
