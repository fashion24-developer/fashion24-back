import { Prisma, UserToken } from '@prisma/client';

import { IRepository } from '@src/common/interfaces/i-repository.interface';

export interface ITokenRepository extends IRepository {
  create(data: any): Promise<UserToken>;
  delete(userTokenDeleteArgs: Prisma.UserTokenDeleteArgs): Promise<UserToken>;
}
