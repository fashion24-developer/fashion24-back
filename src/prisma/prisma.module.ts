import { Global, Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';

@Global() // PrismaService를 전역적으로 사용하려면 Global 데코레이터 사용
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}
