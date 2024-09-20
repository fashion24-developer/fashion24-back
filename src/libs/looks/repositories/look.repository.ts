import { Injectable } from '@nestjs/common';

import { ILookAppRepository } from '@src/api/apps/looks/respositories/i-look.app.repository.interface';
import { LookEntity } from '@src/libs/looks/entity/look.entity';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class LookRepositroy implements ILookAppRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: LookEntity): Promise<LookEntity> {
    console.log(data);
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<LookEntity[]> {
    const look = await this.prisma.look.findMany();

    return look.map((item) => new LookEntity(item));
  }

  findOneById(id: number): Promise<LookEntity> {
    console.log(id);
    throw new Error('Method not implemented.');
  }

  update(data: any): Promise<LookEntity> {
    console.log(data);
    throw new Error('Method not implemented.');
  }
}
