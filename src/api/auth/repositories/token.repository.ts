import { Injectable } from '@nestjs/common';

import { Prisma, UserToken } from '@prisma/client';

import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class TokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.UserTokenCreateInput): Promise<UserToken> {
    return this.prisma.userToken.create({ data });
  }
}
