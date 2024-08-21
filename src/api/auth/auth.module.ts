import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from '@src/api/auth/controllers/auth.controller';
import { AccessTokenStrategy, RefreshTokenStrategy } from '@src/api/auth/jwt/jwt.strategy';
import { TokenRepository } from '@src/api/auth/repositories/token.repository';
import { AuthService } from '@src/api/auth/services/auth.service';
import { TokenService } from '@src/api/auth/services/token.service';
import { UsersModule } from '@src/api/users/users.module';
import { RedisModule } from '@src/common/redis/redis.module';

@Module({
  imports: [UsersModule, RedisModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, TokenService, TokenRepository, AccessTokenStrategy, RefreshTokenStrategy]
})
export class AuthModule {}
