import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-jwt';

import { TokenPayloadDto } from '@src/api/apps/auth/dtos/token-payload.dto';
import { COMMON_ERROR_HTTP_STATUS_MESSAGE } from '@src/common/constants/common.constant';
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
      /**
       * @todo 배포 시 cookie에서만 가져오도록 수정
       */
      // jwtFromRequest: (req) => req.cookies['accessToken'],
      jwtFromRequest: (req) => {
        return req.cookies['accessToken'] || req.headers['authorization']?.split(' ')[1];
      },
      ignoreExpiration: false,
      secretOrKey: appConfigService.get<string>(ENV_KEY.ACCESS_TOKEN_SECRET_KEY),
      passReqToCallback: true
    });
  }

  async validate(request: any, payload: TokenPayloadDto) {
    if (payload.sub !== 'accessToken') {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'invalid token type',
          error: COMMON_ERROR_HTTP_STATUS_MESSAGE[400]
        },
        HttpStatus.BAD_REQUEST
      );
    }

    /**
     * @todo 배포 시 cookie에서만 가져오도록 수정
     */
    // const tokenFromRequest = request.cookies['accessToken'];
    const tokenFromRequest =
      request.cookies['accessToken'] || request.headers['authorization']?.split(' ')[1];
    const tokenInRedis = await this.redisService.get(`${payload.userId}-accessToken`);

    if (!tokenInRedis) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'token not found',
          error: COMMON_ERROR_HTTP_STATUS_MESSAGE[401]
        },
        HttpStatus.UNAUTHORIZED
      );
    } else if (tokenInRedis !== tokenFromRequest) {
      this.redisService.del(`${payload.userId}-accessToken`);
      this.redisService.del(`${payload.userId}-refreshToken`);

      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'token mismatch',
          error: COMMON_ERROR_HTTP_STATUS_MESSAGE[401]
        },
        HttpStatus.UNAUTHORIZED
      );
    }

    return { id: payload.userId, userRole: payload.userRole };
  }
}

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refreshToken') {
  constructor(
    private readonly redisService: RedisService,
    private readonly appConfigService: AppConfigService
  ) {
    super({
      /**
       * @todo 배포 시 cookie에서만 가져오도록 수정
       */
      // jwtFromRequest: (req) => req.cookies['refreshToken'],
      jwtFromRequest: (req) => {
        return req.cookies['refreshToken'] || req.headers['authorization']?.split(' ')[1];
      },
      ignoreExpiration: false,
      secretOrKey: appConfigService.get<string>(ENV_KEY.REFRESH_TOKEN_SECRET_KEY),
      passReqToCallback: true
    });
  }

  async validate(request: any, payload: TokenPayloadDto) {
    if (payload.sub !== 'refreshToken') {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'invalid token type',
          error: COMMON_ERROR_HTTP_STATUS_MESSAGE[400]
        },
        HttpStatus.BAD_REQUEST
      );
    }

    /**
     * @todo 배포 시 cookie에서만 가져오도록 수정
     */
    // const tokenFromRequest = request.cookies['refreshToken'];
    const tokenFromRequest =
      request.cookies['refreshToken'] || request.headers['authorization']?.split(' ')[1];
    const tokenInRedis = await this.redisService.get(`${payload.userId}-refreshToken`);

    if (!tokenInRedis) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'token not found',
          error: COMMON_ERROR_HTTP_STATUS_MESSAGE[401]
        },
        HttpStatus.UNAUTHORIZED
      );
    } else if (tokenInRedis !== tokenFromRequest) {
      this.redisService.del(`${payload.userId}-accessToken`);
      this.redisService.del(`${payload.userId}-refreshToken`);
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'token mismatch',
          error: COMMON_ERROR_HTTP_STATUS_MESSAGE[401]
        },
        HttpStatus.UNAUTHORIZED
      );
    }

    return { id: payload.userId };
  }
}
