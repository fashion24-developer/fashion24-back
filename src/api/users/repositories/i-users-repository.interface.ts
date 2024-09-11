import { Prisma, User, UserToken } from '@prisma/client';

import { IRepository } from '@src/common/interfaces/i-repository.interface';

export interface IUsersRepository extends IRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findOne(userFindUniqueArgs: Prisma.UserFindUniqueArgs): Promise<User | null>;
  findTokens(userTokenFindUniqueArgs: Prisma.UserTokenFindUniqueArgs): Promise<UserToken | null>;
  update(userUpdateArgs: Prisma.UserUpdateArgs): Promise<User>;
}
