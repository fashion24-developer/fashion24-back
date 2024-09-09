import { Module } from '@nestjs/common';

import { FancyAdminController } from '@src/api/fancy/controllers/fancy.admin.controller';
import { FancyRepository } from '@src/api/fancy/repositories/fancy.repository';
import { FancyService } from '@src/api/fancy/services/fancy.service';

@Module({
  imports: [],
  controllers: [FancyAdminController],
  providers: [FancyService, FancyRepository]
})
export class FancyModule {}
