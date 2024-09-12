import { Injectable } from '@nestjs/common';

import { Prisma, User, UserToken } from '@prisma/client';

import { IRepository } from '@src/common/interfaces/i-repository.interface';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class UsersRepository implements IRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  findOne(userFindUniqueArgs: Prisma.UserFindUniqueArgs): Promise<User | null> {
    return this.prisma.user.findUnique(userFindUniqueArgs);
  }

  update(userUpdateArgs: Prisma.UserUpdateArgs): Promise<User> {
    return this.prisma.user.update(userUpdateArgs);
  }
}
