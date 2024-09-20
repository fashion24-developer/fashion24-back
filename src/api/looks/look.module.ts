import { Module } from '@nestjs/common';

import { LookController } from '@src/api/looks/controllers/look.controller';
import { LookRepositroy } from '@src/api/looks/respositories/look.repository';
import { LookService } from '@src/api/looks/services/look.service';
import { LOOK_REPOSITORY_DI_TOKEN } from '@src/common/constants/di.tokens';

@Module({
  controllers: [LookController],
  providers: [LookService, { provide: LOOK_REPOSITORY_DI_TOKEN, useClass: LookRepositroy }]
})
export class LookModule {}
