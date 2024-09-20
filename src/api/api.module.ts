import { Module } from '@nestjs/common';

import { AdminsModule } from '@src/api/admins/admins.module';
import { AppsModule } from '@src/api/apps/apps.module';

@Module({
  imports: [AppsModule, AdminsModule]
})
export class ApiModule {}
