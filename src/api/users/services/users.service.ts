import { Inject, Injectable } from '@nestjs/common';

import { IUserRepository } from '@src/api/users/repositories/i-user-repository.interface';
import { UsersRepository } from '@src/api/users/repositories/users.repository';
import { IUserService } from '@src/api/users/services/i-users-service.interface';

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @Inject(UsersRepository)
    private readonly usersRepository: IUserRepository,
  ) {}

  create() {}

  findAll() {}

  findOne() {}

  update() {}

  delete() {}

  async isOwner() {
    return true;
  }
}
