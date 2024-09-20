import { Injectable } from '@nestjs/common';

import { IFancyAdminRepository } from '@src/api/admins/fancy/repositories/i-fancy-admin-repository.interface';
import { FANCY_FIND_ALL_SELECT } from '@src/api/apps/fancy/constants/fancy-find-all-select.const';
import { FancyOrderBy } from '@src/api/apps/fancy/enums/fancy-orderby.enum';
import { FancyProductStatus } from '@src/api/apps/fancy/enums/fancy-product-status.enum';
import { IFancyRepository } from '@src/api/apps/fancy/repositories/i-fancy-repository.interface';
import { SortOption } from '@src/common/enums/sort-option.enum';
import { ValueOf } from '@src/common/types/common.type';
import { FancyEntity } from '@src/libs/fancy/entities/fancy.entity';
import { PrismaService } from '@src/prisma/prisma.service';
import { FancyMapper } from '@src/utils/mappers/fancy.mapper';

@Injectable()
export class FancyRepository implements IFancyRepository, IFancyAdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: FancyEntity): Promise<FancyEntity> {
    const fancy = await this.prisma.fancy.create({ data: data.getProps() });

    return new FancyEntity(fancy);
  }

  findOne(data: any): Promise<any> {
    return this.prisma.fancy.findFirst({ where: data });
  }

  findOneById(id: number): Promise<null> {
    console.log(id);
    return;
  }

  async findAllForPagination(
    where: {
      name: { contains: string };
      status: ValueOf<typeof FancyProductStatus>;
      AND?: (
        | { fancyOptions: { some: { option: { id: number } } } }
        | { fancySubOptions: { some: { subOption: { id: number } } } }
        | { looks: { some: { id: number } } }
        | { tags: { some: { id: number } } }
      )[];
    },
    select: typeof FANCY_FIND_ALL_SELECT,
    take: number,
    skip: number,
    orderBy: { [K in ValueOf<typeof FancyOrderBy>]?: ValueOf<typeof SortOption> }
  ): Promise<FancyEntity[]> {
    const fancy = await this.prisma.fancy.findMany({ where, select, skip, take, orderBy });

    return fancy.map((record) => FancyMapper.toEntity(record));
  }

  async findAll<K extends keyof FancyEntity>(
    where: Record<K, FancyEntity[K]>
  ): Promise<FancyEntity[]> {
    const records = await this.prisma.fancy.findMany({ where });

    return records.map((record) => new FancyEntity(record));
  }

  update(data: any): Promise<any> {
    return this.prisma.fancy.update({ where: { id: data.id }, data });
  }

  count(where: {
    name: { contains: string };
    status: ValueOf<typeof FancyProductStatus>;
    AND: [
      | { fancyOptions: { some: { option: { id: number } } } }
      | { fancySubOptions: { some: { subOption: { id: number } } } }
      | { looks: { some: { id: number } } }
      | { tags: { some: { id: number } } }
    ];
  }): Promise<number> {
    return this.prisma.fancy.count({ where });
  }
}
