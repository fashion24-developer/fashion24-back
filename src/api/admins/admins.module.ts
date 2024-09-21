import { Module } from '@nestjs/common';

import { FancyAdminModule } from '@src/api/admins/fancy/fancy.admin.module';

@Module({
  imports: [FancyAdminModule]
})
export class AdminsModule {}
