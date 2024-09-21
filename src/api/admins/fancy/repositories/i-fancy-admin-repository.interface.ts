import { IRepository } from '@src/common/interfaces/i-repository.interface';
import { FancyEntity } from '@src/libs/fancy/entities/fancy.entity';

export interface IFancyAdminRepository extends IRepository<FancyEntity> {
  create(data: FancyEntity): Promise<FancyEntity>;
}
