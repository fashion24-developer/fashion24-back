import { Prisma, User } from '@prisma/client';

import { IService } from '@src/common/interfaces/i-service.interface';

export interface IUsersService extends IService {
  create(userData: Prisma.UserCreateInput): Promise<User>;
}
