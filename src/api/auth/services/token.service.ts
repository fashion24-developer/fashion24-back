import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SaveUserTokenDto } from '@src/api/auth/dtos/save-user-token.dto';
import { TokenPayloadDto } from '@src/api/auth/dtos/token-payload.dto';
import { TokenSubEnum } from '@src/api/auth/enums/token-sub.enum';
import { TokenTtlEnum } from '@src/api/auth/enums/token-ttl.enum';
import { ITokenRepository } from '@src/api/auth/repositories/i-token-repository.interface';
import { TokenRepository } from '@src/api/auth/repositories/token.repository';
import { RedisService } from '@src/common/redis/services/redis.service';
import { ENV_KEY } from '@src/core/app-config/constants/app-config.constant';
import { AppConfigService } from '@src/core/app-config/services/app-config.service';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly appConfigService: AppConfigService,
    private readonly redisService: RedisService,
    @Inject(TokenRepository) private readonly tokenRepository: ITokenRepository
  ) {}

  generateToken(payload: TokenPayloadDto): string {
    if (payload.sub === TokenSubEnum.ACCESS_TOKEN) {
      return this.jwtService.sign(payload, {
        expiresIn: TokenTtlEnum.ACCESS_TOKEN,
        secret: this.appConfigService.get<string>(ENV_KEY.ACCESS_TOKEN_SECRET_KEY)
      });
    } else if (payload.sub === TokenSubEnum.REFRESH_TOKEN) {
      return this.jwtService.sign(payload, {
        expiresIn: TokenTtlEnum.REFRESH_TOKEN,
        secret: this.appConfigService.get<string>(ENV_KEY.REFRESH_TOKEN_SECRET_KEY)
      });
    }
  }

  saveTokens(saveUserToken: SaveUserTokenDto): void {
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
      this.tokenRepository.create({
        userId: saveUserToken.userId,
        socialAccessToken: saveUserToken.socialAccessToken,
        socialRefreshToken: saveUserToken.socialRefreshToken
      });
    } catch (error) {
      console.log(error);

      throw new Error(error);
    }
  }
}
