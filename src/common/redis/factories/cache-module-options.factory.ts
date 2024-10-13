import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

import * as redisStore from 'cache-manager-ioredis';

import { ENV_KEY } from '@src/libs/core/app-config/constants/app-config.constant';
import { IAppConfigService } from '@src/libs/core/app-config/services/i-app-config-service.interface';
import { APP_CONFIG_SERVICE_DI_TOKEN } from '@src/libs/core/app-config/tokens/app-config.di-token';
import { Key } from '@src/libs/core/app-config/types/app-config.type';

@Injectable()
export class CacheModuleOptionsFactory implements CacheOptionsFactory {
  constructor(
    @Inject(APP_CONFIG_SERVICE_DI_TOKEN) private readonly appConfigService: IAppConfigService<Key>
  ) {}

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
