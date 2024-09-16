import { CreateFancyDto } from '@src/api/fancy/dtos/create-fancy.dto';
import { FancyDto } from '@src/api/fancy/dtos/fancy.dto';
import { IRepository } from '@src/common/interfaces/i-repository.interface';

export interface IFancyRepository extends IRepository {
  create(data: CreateFancyDto): Promise<FancyDto>;
  findAll(data: any): Promise<any[]>;
  count(data: any): Promise<number>;
}
