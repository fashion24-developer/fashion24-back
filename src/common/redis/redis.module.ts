import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

import { CacheModuleOptionsFactory } from './factories/cache-module-options.factory';
import { RedisService } from './services/redis.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      useClass: CacheModuleOptionsFactory
    })
  ],
  providers: [RedisService, CacheModuleOptionsFactory],
  exports: [RedisService]
})
export class RedisModule {}
