import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { TokenPayloadDto } from '@src/api/auth/dtos/token-payload.dto';
import { RedisService } from '@src/common/redis/services/redis.service';
import { ENV_KEY } from '@src/core/app-config/constants/app-config.constant';
import { AppConfigService } from '@src/core/app-config/services/app-config.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'accessToken') {
  constructor(
    private readonly redisService: RedisService,
    private readonly appConfigService: AppConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfigService.get<string>(ENV_KEY.ACCESS_TOKEN_SECRET_KEY),
      passReqToCallback: true
    });
  }

  async validate(request: any, payload: TokenPayloadDto) {
    if (payload.sub !== 'accessToken') {
      throw new HttpException('invalid token type', HttpStatus.BAD_REQUEST);
    }

    const tokenFromRequest = request.headers.authorization.split(' ')[1];
    const tokenInRedis = await this.redisService.get(`${payload.userId}-accessToken`);

    if (!tokenInRedis) {
      throw new HttpException('token not found', HttpStatus.NOT_FOUND);
    } else if (tokenInRedis !== tokenFromRequest) {
      this.redisService.del(`${payload.userId}-accessToken`);
      this.redisService.del(`${payload.userId}-refreshToken`);

      throw new HttpException('token mismatch', HttpStatus.UNAUTHORIZED);
    }

    return { id: payload.userId };
  }
}

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refreshToken') {
  constructor(
    private readonly redisService: RedisService,
    private readonly appConfigService: AppConfigService
  ) {
    super({
      jwtFromRequest: (req) => req.cookies['refreshToken'],
      ignoreExpiration: false,
      secretOrKey: appConfigService.get<string>(ENV_KEY.REFRESH_TOKEN_SECRET_KEY),
      passReqToCallback: true
    });
  }

  async validate(request: any, payload: TokenPayloadDto) {
    if (payload.sub !== 'refreshToken') {
      throw new HttpException('invalid token type', HttpStatus.BAD_REQUEST);
    }

    const tokenFromRequest = request.cookies['refreshToken'];
    const tokenInRedis = await this.redisService.get(`${payload.userId}-refreshToken`);

    if (!tokenInRedis) {
      throw new HttpException('token not found', HttpStatus.NOT_FOUND);
    } else if (tokenInRedis !== tokenFromRequest) {
      this.redisService.del(`${payload.userId}-accessToken`);
      this.redisService.del(`${payload.userId}-refreshToken`);

      throw new HttpException('token mismatch', HttpStatus.UNAUTHORIZED);
    }

    return { id: payload.userId };
  }
}
