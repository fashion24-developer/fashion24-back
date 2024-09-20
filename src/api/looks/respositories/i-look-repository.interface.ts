import { LookEntity } from '@src/api/looks/entity/look.entity';
import { IRepository } from '@src/common/interfaces/i-repository.interface';

export interface ILookRepository extends IRepository<LookEntity> {
  findAll(): Promise<LookEntity[]>;
}
