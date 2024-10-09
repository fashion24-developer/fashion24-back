import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';

import * as cookieSignature from 'cookie-signature';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TokenTtlEnum } from '@src/api/apps/auth/enums/token-ttl.enum';
import { ENV_KEY } from '@src/libs/core/app-config/constants/app-config.constant';
import { IAppConfigService } from '@src/libs/core/app-config/services/i-app-config-service.interface';
import { APP_CONFIG_SERVICE_DI_TOKEN } from '@src/libs/core/app-config/tokens/app-config.di-token';
import { Key } from '@src/libs/core/app-config/types/app-config.type';

@Injectable()
export class CookieInterceptor implements NestInterceptor {
  constructor(
    @Inject(APP_CONFIG_SERVICE_DI_TOKEN) private readonly appConfigService: IAppConfigService<Key>
  ) {}
  private readonly secret = this.appConfigService.get<string>(ENV_KEY.COOKIE_PARSER_SECRET);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse<Response>();
        const { accessToken, refreshToken } = data;

        if (accessToken) {
          const signedAccessToken = cookieSignature.sign(accessToken, this.secret);
          response.cookie('accessToken', signedAccessToken, {
            // httpOnly: true,
            sameSite: 'lax',
            domain: '.localhost',
            // secure: true,
            maxAge: TokenTtlEnum.ACCESS_TOKEN
          });
        }

        if (refreshToken) {
          const signedRefreshToken = cookieSignature.sign(refreshToken, this.secret);
          response.cookie('refreshToken', signedRefreshToken, {
            // httpOnly: true,
            sameSite: 'lax',
            domain: '.localhost',
            // secure: true,
            maxAge: TokenTtlEnum.REFRESH_TOKEN
          });
        }

        // delete data.accessToken; // accessToken을 응답에서 삭제
        // delete data.refreshToken; // refreshToken을 응답에서 삭제
        return data;
      })
    );
  }
}
