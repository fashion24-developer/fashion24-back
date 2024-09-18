import { Inject, Injectable } from '@nestjs/common';

import { UserEntity } from '@src/api/users/entities/user.entity';
import { IUsersRepository } from '@src/api/users/repositories/i-users-repository.interface';
import { IUsersService } from '@src/api/users/services/i-users-service.interface';
import { USERS_REPOSITORY_DI_TOKEN } from '@src/common/constants/di.tokens';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(USERS_REPOSITORY_DI_TOKEN)
    private readonly usersRepository: IUsersRepository
  ) {}

  create(userData: UserEntity): Promise<UserEntity> {
    return this.usersRepository.create(userData);
  }

  findAll(): Promise<void> {
    return;
  }

  findOneById(id: number): Promise<UserEntity | null> {
    return this.usersRepository.findOneById(id);
  }

  findOneByUniqueId(uniqueId: string): Promise<UserEntity | null> {
    return this.usersRepository.findOneByUniqueId(uniqueId);
  }

  update(data: UserEntity): Promise<UserEntity> {
    return this.usersRepository.update(data);
  }

  delete() {}

  async isOwner() {
    return true;
  }
}
