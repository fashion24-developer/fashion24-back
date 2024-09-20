import { Module } from '@nestjs/common';

import { AuthModule } from '@src/api/apps/auth/auth.module';
import { FancyAppModule } from '@src/api/apps/fancy/fancy.app.module';
import { UsersModule } from '@src/api/apps/users/users.module';

@Module({
  imports: [AuthModule, UsersModule, FancyAppModule]
})
export class AppsModule {}
