import { Injectable } from '@nestjs/common';

import { IRepository } from '@src/common/interfaces/i-repository.interface';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class UsersRepository implements IRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: any): Promise<any> {
    // const user = await this.prisma.user.create({
  }
}
