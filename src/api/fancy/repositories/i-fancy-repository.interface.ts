import { Fancy, Prisma } from '@prisma/client';

import { IRepository } from '@src/common/interfaces/i-repository.interface';

export interface IFancyRepository extends IRepository {
  create(data: Prisma.FancyCreateInput): Promise<Fancy>;
  findAll(data: Prisma.FancyFindManyArgs): Promise<Fancy[]>;
  count(data?: Prisma.FancyCountArgs): Promise<number>;
}
