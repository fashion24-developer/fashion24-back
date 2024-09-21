import { Module } from '@nestjs/common';

import { AuthModule } from '@src/api/apps/auth/auth.module';
import { FancyAppModule } from '@src/api/apps/fancy/fancy.app.module';
import { LookAppModule } from '@src/api/apps/looks/look.app.module';
import { UsersModule } from '@src/api/apps/users/users.module';

@Module({
  imports: [AuthModule, UsersModule, FancyAppModule, LookAppModule]
})
export class AppsModule {}
