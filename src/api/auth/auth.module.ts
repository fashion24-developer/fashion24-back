import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { RedisModule } from '@src/common/redis/redis.module';

import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/auth.controller';
import { JwtModuleOptionsFactory } from './jwt/factories/jwt-module-options.factory';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Module({
  imports: [
    UsersModule,
    RedisModule,
    JwtModule.registerAsync({
      useClass: JwtModuleOptionsFactory
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService]
})
export class AuthModule {}
