import { Module } from '@nestjs/common';

import { FancyAdminModule } from '@src/api/admins/fancy/fancy.admin.module';
import { LookAdminModule } from '@src/api/admins/looks/look.admin.module';

@Module({
  imports: [FancyAdminModule, LookAdminModule]
})
export class AdminsModule {}
