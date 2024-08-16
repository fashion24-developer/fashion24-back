import { Injectable } from '@nestjs/common';

import { Prisma, User } from '@prisma/client';

import { IRepository } from '@src/common/interfaces/i-repository.interface';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class UsersRepository implements IRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prisma.user.create({ data });
    return user;
  }
}
