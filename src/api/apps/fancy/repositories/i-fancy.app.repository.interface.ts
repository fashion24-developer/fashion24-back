import { FancyPaginationDto } from '@src/api/apps/fancy/dtos/fancy-pagination.dto';
import { IRepository } from '@src/common/interfaces/i-repository.interface';
import { FancyEntity } from '@src/libs/fancy/entities/fancy.entity';

export interface IFancyAppRepository extends IRepository<FancyEntity> {
  create(data: FancyEntity): Promise<FancyEntity>;

  findOneById(id: number): Promise<any>;

  update(data: any): Promise<any>;

  paginate(
    paginationData: FancyPaginationDto,
    skip: number
  ): Promise<{ totalCount: number; data: FancyEntity[] }>;
}
