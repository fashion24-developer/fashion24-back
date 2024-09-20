import { LookEntity } from '@src/api/apps/looks/entity/look.entity';
import { IRepository } from '@src/common/interfaces/i-repository.interface';

export interface ILookAppRepository extends IRepository<LookEntity> {
  findAll(): Promise<LookEntity[]>;
}
