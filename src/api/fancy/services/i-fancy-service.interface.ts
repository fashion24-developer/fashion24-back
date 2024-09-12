import { Fancy } from '@prisma/client';

import { CreateFancyDto } from '@src/api/fancy/dtos/create-fancy.dto';
import { FindAllFancyDto } from '@src/api/fancy/dtos/find-all-fancy.dto';
import { IService } from '@src/common/interfaces/i-service.interface';
import { IPaginationMeta } from '@src/common/interfaces/pagination/i-pagination-meta.interface';

export interface IFancyService extends IService {
  create(fancyData: CreateFancyDto): Promise<Fancy>;
  findAll(paginationData: FindAllFancyDto): Promise<{ data: Fancy[]; meta: IPaginationMeta }>;
}
