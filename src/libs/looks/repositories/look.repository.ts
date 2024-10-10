import { Injectable } from '@nestjs/common';

import { LookEntity } from '@src/libs/looks/entities/look.entity';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class LookRepositroy {
  constructor(private readonly prisma: PrismaService) {}

  create(data: LookEntity): Promise<LookEntity> {
    console.log(data);
    throw new Error('Method not implemented.');
  }

  async findAll() {}

  findOneById(id: number): Promise<LookEntity> {
    console.log(id);
    throw new Error('Method not implemented.');
  }

  update(data: any): Promise<LookEntity> {
    console.log(data);
    throw new Error('Method not implemented.');
  }
}
