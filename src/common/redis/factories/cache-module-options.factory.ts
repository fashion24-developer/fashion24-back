import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager';
import { Injectable } from '@nestjs/common';

import * as redisStore from 'cache-manager-ioredis';

import { ENV_KEY } from '@src/libs/core/app-config/constants/app-config.constant';
import { AppConfigService } from '@src/libs/core/app-config/services/app-config.service';

@Injectable()
export class CacheModuleOptionsFactory implements CacheOptionsFactory {
  constructor(private readonly appConfigService: AppConfigService) {}

  createCacheOptions(): CacheModuleOptions<Record<string, any>> {
    return {
      isGlobal: false,
      store: redisStore,
      host: this.appConfigService.get(ENV_KEY.REDIS_HOST),
      port: this.appConfigService.get(ENV_KEY.REDIS_PORT),
      password: this.appConfigService.get(ENV_KEY.REDIS_PASSWORD)
    };
  }
}
