import { CreateFancyInputDto } from '@src/api/fancy/dtos/create-fancy-input.dto';
import { FancyDto } from '@src/api/fancy/dtos/fancy.dto';
import { FindAllFancyResponseDto } from '@src/api/fancy/dtos/find-all-fancy-response.dto';
import { FindAllFancyDto } from '@src/api/fancy/dtos/find-all-fancy.dto';
import { PaginationResponseDto } from '@src/common/dtos/pagination/pagination-response.dto';
import { IService } from '@src/common/interfaces/i-service.interface';

export interface IFancyService extends IService {
  create(fancyData: CreateFancyInputDto): Promise<FancyDto>;
  findAll(paginationData: FindAllFancyDto): Promise<PaginationResponseDto<FindAllFancyResponseDto>>;
}
