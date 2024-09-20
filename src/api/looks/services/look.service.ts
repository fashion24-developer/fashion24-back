import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';

import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { LookEntity } from '@src/api/looks/entity/look.entity';
import { ILookRepository } from '@src/api/looks/respositories/i-look-repository.interface';
import { LOOK_REPOSITORY_DI_TOKEN } from '@src/common/constants/di.tokens';

@Injectable()
export class LookService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
    @Inject(LOOK_REPOSITORY_DI_TOKEN) private readonly lookRepository: ILookRepository
  ) {}

  findAll(): Promise<LookEntity[]> {
    try {
      return this.lookRepository.findAll();
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Failed to find all look', HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    }
  }
}
