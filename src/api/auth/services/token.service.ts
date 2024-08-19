import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ENV_KEY } from '@src/core/app-config/constants/app-config.constant';
import { AppConfigService } from '@src/core/app-config/services/app-config.service';

import { TokenPayloadDto } from '../dtos/token-payload.dto';
import { TokenSubEnum } from '../enums/token-sub-enum';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly appConfigService: AppConfigService
  ) {}

  generateToken(payload: TokenPayloadDto) {
    if (payload.sub === TokenSubEnum.ACCESS_TOKEN) {
      return this.jwtService.sign(payload, {
        expiresIn: '1d',
        secret: this.appConfigService.get<string>(ENV_KEY.ACCESS_TOKEN_SECRET_KEY)
      });
    } else if (payload.sub === TokenSubEnum.REFRESH_TOKEN) {
      return this.jwtService.sign(payload, {
        expiresIn: '7d',
        secret: this.appConfigService.get<string>(ENV_KEY.REFRESH_TOKEN_SECRET_KEY)
      });
    }
  }

  saveTokens(userId: number, accessToken: string, refreshToken: string) {
    // 레디스에 토큰 저장
  }
}
