import { Module } from '@nestjs/common';

import { AuthModule } from '@src/api/auth/auth.module';
import { FancyModule } from '@src/api/fancy/fancy.module';
import { LookModule } from '@src/api/looks/look.module';
import { UsersModule } from '@src/api/users/users.module';

@Module({
  imports: [AuthModule, UsersModule, FancyModule, LookModule]
})
export class ApiModule {}
