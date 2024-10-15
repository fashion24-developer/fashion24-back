import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { IFancyAdminRepository } from '@src/api/admins/fancy/repositories/i-fancy-admin-repository.interface';
import { FancyPaginationDto } from '@src/api/apps/fancy/dtos/fancy-pagination.dto';
import { FancyProductStatus } from '@src/api/apps/fancy/enums/fancy-product-status.enum';
import { IFancyAppRepository } from '@src/api/apps/fancy/repositories/i-fancy.app.repository.interface';
import { ValueOf } from '@src/common/types/common.type';
import { FancyEntity } from '@src/libs/fancy/entities/fancy.entity';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class FancyRepository implements IFancyAdminRepository, IFancyAppRepository {
  constructor(private readonly prisma: PrismaService) {}
  findAll<K extends keyof FancyEntity>(
    where: Record<K, FancyEntity[K]>,
    include?: Record<keyof FancyEntity, boolean>
  ): Promise<FancyEntity[]> {
    throw new Error('Method not implemented.');
  }

  async create(data: FancyEntity) {
    return new FancyEntity(data);
  }

  findOne(data: any): Promise<any> {
    return this.prisma.fancy.findFirst({ where: data });
  }

  findOneById(id: number): Promise<null> {
    console.log(id);
    return;
  }

  update(data: any): Promise<any> {
    return this.prisma.fancy.update({ where: { id: data.id }, data });
  }

  async paginate(
    paginationData: FancyPaginationDto,
    skip: number
  ): Promise<{ totalCount: number; data: FancyEntity[] }> {
    const { pageSize: take, orderBy, orderDirection, ...whereInput } = paginationData;

    const { fancyLookId, fancyTagId, fancyTypeId, name, status } = whereInput;

    const where: Prisma.FancyWhereInput = {
      fancyLookId,
      fancyTypeId,
      status,
      name: { contains: name },
      AND: [...(fancyTagId ? fancyTagId.map((id) => ({ fancyTags: { some: { id: id } } })) : [])]
    };

    const totalCount = await this.prisma.fancy.count({ where });

    // if (!totalCount) {
    //   return { totalCount, data: [] };
    // }

    const data = await this.prisma.fancy.findMany({
      select: {
        fancyImages: true,
        fancyPlatingColors: { select: { platingColor: true }, orderBy: { order: 'asc' } },
        fancySizeStocks: {
          select: { id: true, quantity: true, createdAt: true, updatedAt: true, fancySize: true }
        }
      },
      where,
      skip,
      take,
      orderBy: { [orderBy]: orderDirection }
    });

    console.log(data);

    throw new Error('asds');

    // return { totalCount, data: data.map((data) => new FancyEntity(data)) };
  }
}
