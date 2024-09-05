import { Fancy, Prisma } from '@prisma/client';

import { IRepository } from '@src/common/interfaces/i-repository.interface';

export interface IFancyRepository extends IRepository {
  create(data: Prisma.FancyCreateInput): Promise<Fancy>;
}
