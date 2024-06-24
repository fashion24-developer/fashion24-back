import { Module } from '@nestjs/common';

import { UsersModule } from '@src/api/users/users.module';

@Module({
  imports: [UsersModule],
})
export class ApiModule {}
