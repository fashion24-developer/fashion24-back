import { Module } from '@nestjs/common';

import { UsersController } from '@src/api/users/controllers/users.controller';
import { UsersRepository } from '@src/api/users/repositories/users.repository';
import { UsersService } from '@src/api/users/services/users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository]
})
export class UsersModule {}
