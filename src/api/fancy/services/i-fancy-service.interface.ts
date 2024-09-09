import { Fancy } from '@prisma/client';

import { CreateFancyDto } from '@src/api/fancy/dtos/create-fancy.dto';
import { IService } from '@src/common/interfaces/i-service.interface';

export interface IFancyService extends IService {
  create(fancyData: CreateFancyDto): Promise<Fancy>;
}
