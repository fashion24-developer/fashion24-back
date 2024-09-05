import { Module } from '@nestjs/common';

import { FancyController } from '@src/api/fancy/controllers/fancy.controller';
import { FancyRepository } from '@src/api/fancy/repositories/fancy.repository';
import { FancyService } from '@src/api/fancy/services/fancy.service';

@Module({
  imports: [],
  controllers: [FancyController],
  providers: [FancyService, FancyRepository]
})
export class FancyModule {}
