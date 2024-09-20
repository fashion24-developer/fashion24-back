import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';

import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { ILookAppRepository } from '@src/api/apps/looks/respositories/i-look.app.repository.interface';
import { LOOK_REPOSITORY_DI_TOKEN } from '@src/common/constants/di.tokens';
import { LookEntity } from '@src/libs/looks/entity/look.entity';

@Injectable()
export class LookAppService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
    @Inject(LOOK_REPOSITORY_DI_TOKEN) private readonly lookAppRepository: ILookAppRepository
  ) {}

  findAll(): Promise<LookEntity[]> {
    try {
      return this.lookAppRepository.findAll();
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Failed to find all look', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
