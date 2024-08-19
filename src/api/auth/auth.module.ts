import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { RedisModule } from '@src/common/redis/redis.module';

import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Module({
  imports: [UsersModule, RedisModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, TokenService]
})
export class AuthModule {}
