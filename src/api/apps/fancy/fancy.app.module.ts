import { Module } from '@nestjs/common';

import { FancyAppController } from '@src/api/apps/fancy/controllers/fancy.app.controller';
import { FancyAppService } from '@src/api/apps/fancy/services/fancy.app.service';
import { FANCY_REPOSITORY_DI_TOKEN } from '@src/common/constants/di.tokens';
import { FancyRepository } from '@src/libs/fancy/repositories/fancy.repository';

@Module({
  imports: [],
  controllers: [FancyAppController],
  providers: [FancyAppService, { provide: FANCY_REPOSITORY_DI_TOKEN, useClass: FancyRepository }]
})
export class FancyAppModule {}
