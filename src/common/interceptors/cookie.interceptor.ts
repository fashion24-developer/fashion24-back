import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TokenTtlEnum } from '@src/api/auth/enums/token-ttl.enum';

@Injectable()
export class CookieInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse<Response>();
        const { accessToken, refreshToken } = data;

        if (accessToken && refreshToken) {
          response.cookie('accessToken', accessToken, {
            // httpOnly: true,
            sameSite: 'lax',
            domain: '.localhost',
            // secure: true,
            maxAge: TokenTtlEnum.ACCESS_TOKEN
          });
          response.cookie('refreshToken', refreshToken, {
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
