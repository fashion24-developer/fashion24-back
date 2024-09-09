import { Module } from '@nestjs/common';

import { AuthModule } from '@src/api/auth/auth.module';
import { FancyModule } from '@src/api/fancy/fancy.module';
import { UsersModule } from '@src/api/users/users.module';

@Module({
  imports: [AuthModule, UsersModule, FancyModule]
})
export class ApiModule {}
