import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from '@src/api/apps/auth/controllers/auth.controller';
import { AccessTokenStrategy, RefreshTokenStrategy } from '@src/api/apps/auth/jwt/jwt.strategy';
import { TokenRepository } from '@src/api/apps/auth/repositories/token.repository';
import { AuthService } from '@src/api/apps/auth/services/auth.service';
import { TokenService } from '@src/api/apps/auth/services/token.service';
import { UsersModule } from '@src/api/apps/users/users.module';
import { AUTH_SERVICE_DI_TOKEN, TOKEN_SERVICE_DI_TOKEN } from '@src/common/constants/di.tokens';
import { RedisModule } from '@src/common/redis/redis.module';

@Module({
  imports: [UsersModule, RedisModule, JwtModule],
  controllers: [AuthController],
  providers: [
    { provide: AUTH_SERVICE_DI_TOKEN, useClass: AuthService },
    { provide: TOKEN_SERVICE_DI_TOKEN, useClass: TokenService },
    TokenRepository,
    AccessTokenStrategy,
    RefreshTokenStrategy
  ]
})
export class AuthModule {}
