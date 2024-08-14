import { Module } from '@nestjs/common';

import { UsersModule } from '@src/api/users/users.module';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, UsersModule],
})
export class ApiModule {}
