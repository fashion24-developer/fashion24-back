import { Prisma, User } from '@prisma/client';

import { IRepository } from '@src/common/interfaces/i-repository.interface';

export interface IUsersRepository extends IRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
}
