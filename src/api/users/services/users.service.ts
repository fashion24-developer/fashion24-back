import { Inject, Injectable } from '@nestjs/common';

import { User } from '@prisma/client';

import { IUsersRepository } from '@src/api/users/repositories/i-users-repository.interface';
import { UsersRepository } from '@src/api/users/repositories/users.repository';
import { IUserService } from '@src/api/users/services/i-users-service.interface';

import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @Inject(UsersRepository)
    private readonly usersRepository: IUsersRepository
  ) {}

  // create(userData: CreateUserDto): Promise<User> {
  //   const newUser = this.usersRepository.create(userData);
  //   return newUser;
  // }

  create(userData: CreateUserDto) {}

  findAll() {}

  findOne() {}

  update() {}

  delete() {}

  async isOwner() {
    return true;
  }
}
