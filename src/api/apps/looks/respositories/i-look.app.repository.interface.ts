import { IRepository } from '@src/common/interfaces/i-repository.interface';
import { LookEntity } from '@src/libs/looks/entity/look.entity';

export interface ILookAppRepository extends IRepository<LookEntity> {
  findAll(): Promise<LookEntity[]>;
}
