import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { SaveUserTokenDto } from '@src/api/auth/dtos/save-user-token.dto';
import { TokenPayloadDto } from '@src/api/auth/dtos/token-payload.dto';
import { TokenSubEnum } from '@src/api/auth/enums/token-sub.enum';
import { TokenTtlEnum } from '@src/api/auth/enums/token-ttl.enum';
import { ITokenRepository } from '@src/api/auth/repositories/i-token-repository.interface';
import { TokenRepository } from '@src/api/auth/repositories/token.repository';
import { ITokenService } from '@src/api/auth/services/i-token-service.interface';
import { COMMON_ERROR_HTTP_STATUS_MESSAGE } from '@src/common/constants/common.constant';
import { RedisService } from '@src/common/redis/services/redis.service';
import { ENV_KEY } from '@src/core/app-config/constants/app-config.constant';
import { AppConfigService } from '@src/core/app-config/services/app-config.service';

@Injectable()
export class TokenService implements ITokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly appConfigService: AppConfigService,
    private readonly redisService: RedisService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
    @Inject(TokenRepository) private readonly tokenRepository: ITokenRepository
  ) {}

  generateToken(payload: TokenPayloadDto): string {
    return this.jwtService.sign(payload, {
      expiresIn:
        payload.sub === TokenSubEnum.ACCESS_TOKEN
          ? TokenTtlEnum.ACCESS_TOKEN
          : TokenTtlEnum.REFRESH_TOKEN,
      secret: this.appConfigService.get<string>(
        payload.sub === TokenSubEnum.ACCESS_TOKEN
          ? ENV_KEY.ACCESS_TOKEN_SECRET_KEY
          : ENV_KEY.REFRESH_TOKEN_SECRET_KEY
      )
    });
  }

  async saveTokens(saveUserToken: SaveUserTokenDto): Promise<void> {
    try {
      this.redisService.set(
        `${String(saveUserToken.userId)}-accessToken`,
        saveUserToken.accessToken,
        TokenTtlEnum.ACCESS_TOKEN
      );
      this.redisService.set(
        `${String(saveUserToken.userId)}-refreshToken`,
        saveUserToken.refreshToken,
        TokenTtlEnum.REFRESH_TOKEN
      );
      await this.tokenRepository.create({
        userId: saveUserToken.userId,
        socialAccessToken: saveUserToken.socialAccessToken,
        socialRefreshToken: saveUserToken.socialRefreshToken
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to save the token',
          error: COMMON_ERROR_HTTP_STATUS_MESSAGE[500]
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async deleteTokens(userId: number): Promise<void> {
    try {
      this.redisService.del(`${String(userId)}-accessToken`);
      this.redisService.del(`${String(userId)}-refreshToken`);
      await this.tokenRepository.delete({ where: { userId } });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to delete the token',
          error: COMMON_ERROR_HTTP_STATUS_MESSAGE[500]
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
