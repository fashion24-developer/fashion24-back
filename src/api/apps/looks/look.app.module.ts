import { Module } from '@nestjs/common';

import { LookAppController } from '@src/api/apps/looks/controllers/look.app.controller';
import { LookRepositroy } from '@src/api/apps/looks/respositories/look.repository';
import { LookAppService } from '@src/api/apps/looks/services/look.app.service';
import { LOOK_REPOSITORY_DI_TOKEN } from '@src/common/constants/di.tokens';

@Module({
  controllers: [LookAppController],
  providers: [LookAppService, { provide: LOOK_REPOSITORY_DI_TOKEN, useClass: LookRepositroy }]
})
export class LookModule {}
