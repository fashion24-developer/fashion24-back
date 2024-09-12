import { Prisma, User, UserToken } from '@prisma/client';

import { IRepository } from '@src/common/interfaces/i-repository.interface';

export interface IUsersRepository extends IRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findOne(userFindUniqueArgs: Prisma.UserFindUniqueArgs): Promise<User | null>;
  update(userUpdateArgs: Prisma.UserUpdateArgs): Promise<User>;
}
