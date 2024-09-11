import { Inject, Injectable } from '@nestjs/common';

import { Prisma, User, UserToken } from '@prisma/client';

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

  findAll() {}

  findOne(userFindUniqueArgs: Prisma.UserFindUniqueArgs): Promise<User | null> {
    return this.usersRepository.findOne(userFindUniqueArgs);
  }

  findTokens(userTokenFindUniqueArgs: Prisma.UserTokenFindUniqueArgs): Promise<UserToken | null> {
    return this.usersRepository.findTokens(userTokenFindUniqueArgs);
  }

  update(userUpdateArgs: Prisma.UserUpdateArgs): Promise<User> {
    return this.usersRepository.update(userUpdateArgs);
  }

  delete() {}

  async isOwner() {
    return true;
  }
}
