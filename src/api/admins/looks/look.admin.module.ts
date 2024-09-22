import { Module } from '@nestjs/common';

import { LookAdminController } from '@src/api/admins/looks/controllers/look.admin.controller';
import { LookAdminService } from '@src/api/admins/looks/services/look.admin.service';
import { LOOK_ADMIN_REPOSITORY_DI_TOKEN } from '@src/common/constants/di.tokens';

@Module({
  imports: [],
  controllers: [LookAdminController],
  providers: [
    LookAdminService,
    { provide: LOOK_ADMIN_REPOSITORY_DI_TOKEN, useClass: LookAdminService }
  ]
})
export class LookAdminModule {}
