import { Inject, Injectable } from '@nestjs/common';

import { User } from '@prisma/client';

import { IUserRepository } from '@src/api/users/repositories/i-user-repository.interface';
import { UsersRepository } from '@src/api/users/repositories/users.repository';
import { IUserService } from '@src/api/users/services/i-users-service.interface';

import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @Inject(UsersRepository)
    private readonly usersRepository: IUserRepository,
  ) {}

  create(userData: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(userData);
    return newUser;
  }

  findAll() {}

  findOne() {}

  update() {}

  delete() {}

  async isOwner() {
    return true;
  }
}
