import { Inject, Injectable } from '@nestjs/common';

import { Prisma, User } from '@prisma/client';

import { IUsersRepository } from '@src/api/users/repositories/i-users-repository.interface';
import { UsersRepository } from '@src/api/users/repositories/users.repository';
import { IUsersService } from '@src/api/users/services/i-users-service.interface';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(UsersRepository)
    private readonly usersRepository: IUsersRepository
  ) {}

  create(userData: Prisma.UserCreateInput): Promise<User> {
    return this.usersRepository.create(userData);
  }

  findAll(): Promise<void> {
    return;
  }

  findOne(userFindUniqueArgs: Prisma.UserFindUniqueArgs): Promise<User | null> {
    return this.usersRepository.findOne(userFindUniqueArgs);
  }

  update(userUpdateArgs: Prisma.UserUpdateArgs): Promise<User> {
    return this.usersRepository.update(userUpdateArgs);
  }

  delete() {}

  async isOwner() {
    return true;
  }
}
