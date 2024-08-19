import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  get(userId: string): Promise<string | undefined | null> {
    return this.cacheManager.get<string>(userId);
  }

  set(key: string, value: string, ttl: number) {
    this.cacheManager.set(key, value, ttl);
  }

  del(key: string) {
    this.cacheManager.del(key);
  }
}
