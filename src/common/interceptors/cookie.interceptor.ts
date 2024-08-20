import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import * as cookieSignature from 'cookie-signature';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TokenTtlEnum } from '@src/api/auth/enums/token-ttl.enum';
import { ENV_KEY } from '@src/core/app-config/constants/app-config.constant';
import { AppConfigService } from '@src/core/app-config/services/app-config.service';

@Injectable()
export class CookieInterceptor implements NestInterceptor {
  constructor(private readonly appConfigService: AppConfigService) {}
  private readonly secret = this.appConfigService.get<string>(ENV_KEY.COOKIE_PARSER_SECRET);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse<Response>();
        const { accessToken, refreshToken } = data;

        if (accessToken && refreshToken) {
          const signedAccessToken = cookieSignature.sign(accessToken, this.secret);
          const signedRefreshToken = cookieSignature.sign(refreshToken, this.secret);

          response.cookie('accessToken', signedAccessToken, {
            // httpOnly: true,
            sameSite: 'lax',
            domain: '.localhost',
            // secure: true,
            maxAge: TokenTtlEnum.ACCESS_TOKEN
          });
          response.cookie('refreshToken', signedRefreshToken, {
            // httpOnly: true,
            sameSite: 'lax',
            domain: '.localhost',
            // secure: true,
            maxAge: TokenTtlEnum.REFRESH_TOKEN
          });
        }

        delete data.accessToken; // accessToken을 응답에서 삭제
        delete data.refreshToken; // refreshToken을 응답에서 삭제
        return data;
      })
    );
  }
}
