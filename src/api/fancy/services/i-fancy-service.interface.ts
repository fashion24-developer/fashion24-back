import { Fancy } from '@prisma/client';

import { CreateFancyDto } from '@src/api/fancy/dtos/create-fancy.dto';
import { IRepository } from '@src/common/interfaces/i-repository.interface';

export interface IFancyService extends IRepository {
  create(fancyData: CreateFancyDto): Promise<Fancy>;
}
