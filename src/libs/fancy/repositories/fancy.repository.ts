import { Injectable } from '@nestjs/common';

import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class FancyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create() {}

  findOne(data: any): Promise<any> {
    return this.prisma.fancy.findFirst({ where: data });
  }

  findOneById(id: number): Promise<null> {
    console.log(id);
    return;
  }

  async findAllForPagination() {}

  async findAll() {}

  update(data: any): Promise<any> {
    return this.prisma.fancy.update({ where: { id: data.id }, data });
  }

  count() {}
}
