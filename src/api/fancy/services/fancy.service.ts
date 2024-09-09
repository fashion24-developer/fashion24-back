import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { Fancy, Prisma } from '@prisma/client';
import { nanoid } from 'nanoid';

import { CreateFancyDto } from '@src/api/fancy/dtos/create-fancy.dto';
import { FancyRepository } from '@src/api/fancy/repositories/fancy.repository';
import { IFancyRepository } from '@src/api/fancy/repositories/i-fancy-repository.interface';
import { IFancyService } from '@src/api/fancy/services/i-fancy-service.interface';

@Injectable()
export class FancyService implements IFancyService {
  constructor(@Inject(FancyRepository) private readonly fancyRepository: IFancyRepository) {}

  async create(fancyData: CreateFancyDto): Promise<Fancy> {
    try {
      const id = nanoid();
      const price = this.calculatePrice(fancyData.costPrice, fancyData.discountRate);
      const createFancyData: Prisma.FancyCreateInput = { ...fancyData, id, price };

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

  async findAll() {
    return [];
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
