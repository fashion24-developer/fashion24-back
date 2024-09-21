import { Module } from '@nestjs/common';

import { FancyAdminController } from '@src/api/admins/fancy/controllers/fancy.admin.controller';
import { FancyAdminService } from '@src/api/admins/fancy/services/fancy.admin.service';
import { FANCY_ADMIN_REPOSITORY_DI_TOKEN } from '@src/common/constants/di.tokens';
import { FancyRepository } from '@src/libs/fancy/repositories/fancy.repository';

@Module({
  imports: [],
  controllers: [FancyAdminController],
  providers: [
    FancyAdminService,
    { provide: FANCY_ADMIN_REPOSITORY_DI_TOKEN, useClass: FancyRepository }
  ]
})
export class FancyAdminModule {}
