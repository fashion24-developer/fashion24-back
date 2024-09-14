import { CreateFancyInputDto } from '@src/api/fancy/dtos/create-fancy-input.dto';
import { FancyDto } from '@src/api/fancy/dtos/fancy.dto';
import { FindAllFancyDto } from '@src/api/fancy/dtos/find-all-fancy.dto';
import { IService } from '@src/common/interfaces/i-service.interface';
import { IPaginationMeta } from '@src/common/interfaces/pagination/i-pagination-meta.interface';

export interface IFancyService extends IService {
  create(fancyData: CreateFancyInputDto): Promise<FancyDto>;
  findAll(paginationData: FindAllFancyDto): Promise<{ data: FancyDto[]; meta: IPaginationMeta }>;
}
