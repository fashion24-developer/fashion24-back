import { Injectable } from '@nestjs/common';

import { Prisma, UserToken } from '@prisma/client';

import { ITokenRepository } from '@src/api/auth/repositories/i-token-repository.interface';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class TokenRepository implements ITokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.UserTokenCreateInput): Promise<UserToken> {
    return this.prisma.userToken.create({ data });
  }

  findOne(data: any): Promise<any> {
    return;
  }

  update(data: any): Promise<any> {
    return;
  }

  delete(userTokenDeleteArgs: Prisma.UserTokenDeleteArgs): Promise<UserToken> {
    return this.prisma.userToken.delete(userTokenDeleteArgs);
  }
}
