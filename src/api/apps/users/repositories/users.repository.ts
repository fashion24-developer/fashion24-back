import { Injectable } from '@nestjs/common';

import { UserEntity } from '@src/api/apps/users/entities/user.entity';
import { IUsersRepository } from '@src/api/apps/users/repositories/i-users-repository.interface';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: UserEntity): Promise<UserEntity> {
    const record = await this.prisma.user.create({ data });

    return new UserEntity(record);
  }

  async findOneById(id: number): Promise<UserEntity> {
    const record = await this.prisma.user.findUnique({ where: { id } });

    return new UserEntity(record);
  }

  async findOneByUniqueId(uniqueId: string): Promise<UserEntity | null> {
    const record = await this.prisma.user.findUnique({ where: { uniqueId } });

    return new UserEntity(record);
  }

  async findAll<K extends keyof UserEntity>(
    where: Record<K, UserEntity[K]>
  ): Promise<UserEntity[]> {
    const records = await this.prisma.user.findMany({ where });

    return records.map((record) => new UserEntity(record));
  }

  async update(data: UserEntity): Promise<UserEntity> {
    const record = await this.prisma.user.update({ data: data.getProps(), where: { id: data.id } });

    return new UserEntity(record);
  }
}
