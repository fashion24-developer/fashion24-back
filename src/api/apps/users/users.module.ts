import { Module } from '@nestjs/common';

import { UsersController } from '@src/api/apps/users/controllers/users.controller';
import { UsersRepository } from '@src/api/apps/users/repositories/users.repository';
import { UsersService } from '@src/api/apps/users/services/users.service';
import { USERS_REPOSITORY_DI_TOKEN, USERS_SERVICE_DI_TOKEN } from '@src/common/constants/di.tokens';

@Module({
  controllers: [UsersController],
  providers: [
    { provide: USERS_SERVICE_DI_TOKEN, useClass: UsersService },
    { provide: USERS_REPOSITORY_DI_TOKEN, useClass: UsersRepository }
  ],
  exports: [
    { provide: USERS_SERVICE_DI_TOKEN, useClass: UsersService },
    { provide: USERS_REPOSITORY_DI_TOKEN, useClass: UsersRepository }
  ]
})
export class UsersModule {}
