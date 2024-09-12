import { Injectable } from '@nestjs/common';

import { Fancy, Prisma } from '@prisma/client';

import { IFancyRepository } from '@src/api/fancy/repositories/i-fancy-repository.interface';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class FancyRepository implements IFancyRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.FancyCreateInput): Promise<Fancy> {
    return this.prisma.fancy.create({ data });
  }

  findOne(data: any): Promise<any> {
    return this.prisma.fancy.findFirst({ where: data });
  }

  findAll(data: Prisma.FancyFindManyArgs): Promise<Fancy[]> {
    return this.prisma.fancy.findMany(data);
  }

  update(data: any): Promise<any> {
    return this.prisma.fancy.update({ where: { id: data.id }, data });
  }

  count(data?: Prisma.FancyCountArgs): Promise<number> {
    return this.prisma.fancy.count(data);
  }
}
