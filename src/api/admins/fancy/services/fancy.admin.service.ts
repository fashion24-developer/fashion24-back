import { HttpException, HttpStatus, Inject, Logger } from '@nestjs/common';

import { nanoid } from 'nanoid';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { CreateFancyInputDto } from '@src/api/admins/fancy/dtos/create-fancy-input.dto';
import { IFancyAdminRepository } from '@src/api/admins/fancy/repositories/i-fancy-admin-repository.interface';
import { FANCY_ADMIN_REPOSITORY_DI_TOKEN } from '@src/common/constants/di.tokens';
import { FancyEntity } from '@src/libs/fancy/entities/fancy.entity';

export class FancyAdminService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
    @Inject(FANCY_ADMIN_REPOSITORY_DI_TOKEN)
    private readonly fancyAdminRepository: IFancyAdminRepository
  ) {}

  async create(fancyData: CreateFancyInputDto): Promise<FancyEntity> {
    try {
      const id = nanoid();
      const price = this.calculatePrice(fancyData.costPrice, fancyData.discountRate);

      return this.fancyAdminRepository.create(new FancyEntity({ id, price, ...fancyData }));
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Failed to create fancy', HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    }
  }

  private calculatePrice(costPrice: number, discountRate: number): number {
    const price = costPrice * (1 - discountRate / 100);
    return Math.ceil(price);
  }
}
