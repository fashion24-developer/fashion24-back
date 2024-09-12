import { Fancy } from '@prisma/client';

import { CreateFancyDto } from '@src/api/fancy/dtos/create-fancy.dto';
import { PaginationResponseDto } from '@src/common/dtos/pagination/pagination-response.dto';
import { IService } from '@src/common/interfaces/i-service.interface';

import { FindAllFancyDto } from '../dtos/find-all-fancy.dto';

export interface IFancyService extends IService {
  create(fancyData: CreateFancyDto): Promise<Fancy>;
  findAll(paginationData: FindAllFancyDto): Promise<PaginationResponseDto<Fancy>>;
}
