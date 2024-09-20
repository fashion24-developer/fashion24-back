import { Injectable } from '@nestjs/common';

import { UserTokenEntity } from '@src/api/auth/entities/token.entity';
import { ITokenRepository } from '@src/api/auth/repositories/i-token-repository.interface';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class TokenRepository implements ITokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: UserTokenEntity): Promise<UserTokenEntity> {
    const record = await this.prisma.userToken.create({
      data: {
        userId: data.userId,
        socialAccessToken: data.socialAccessToken,
        socialRefreshToken: data.socialRefreshToken
      }
    });

    return new UserTokenEntity(record);
  }

  async findOneById(id: number): Promise<UserTokenEntity | null> {
    const record = await this.prisma.userToken.findUnique({ where: { id } });

    return record ? new UserTokenEntity(record) : null;
  }

  async findAll<T extends keyof UserTokenEntity>(
    where: Record<T, UserTokenEntity[T]>,
    include?: Record<keyof Pick<UserTokenEntity, 'user'>, boolean>
  ): Promise<UserTokenEntity[]> {
    const records = await this.prisma.userToken.findMany({ where, include });

    return records.map((record) => new UserTokenEntity(record));
  }

  async findOneByUserId(userId: number): Promise<UserTokenEntity | null> {
    const record = await this.prisma.userToken.findUnique({ where: { userId } });

    return record ? new UserTokenEntity(record) : null;
  }

  update(): Promise<any> {
    return;
  }

  async deleteByUserId(userId: number): Promise<UserTokenEntity> {
    const record = await this.prisma.userToken.delete({ where: { userId } });

    return new UserTokenEntity(record);
  }
}
