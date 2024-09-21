import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Observable } from 'rxjs';

import { UserRole } from '@src/api/apps/users/enums/user-role.enum';
import { COMMON_ERROR_HTTP_STATUS_MESSAGE } from '@src/common/constants/common.constant';

@Injectable()
export class AccessTokenAuthGuard extends AuthGuard('accessToken') {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    /**
     * @todo 배포 시 cookie에서만 가져오도록 수정
     */
    // const accessToken = request.cookies['accessToken'];
    const accessToken =
      request.cookies['accessToken'] || request.headers['authorization']?.split(' ')[1];

    if (!accessToken) {
      throw new HttpException('jwt must be provided', HttpStatus.BAD_REQUEST);
    }
    return super.canActivate(context);
  }

  handleRequest(
    err: any,
    user: any,
    info: { message: string | Record<string, any> },
    context: ExecutionContext
  ) {
    try {
      if (user) {
        return super.handleRequest(err, user, info, context);
      }

      if (err instanceof HttpException) throw err;

      throw new HttpException(info.message, getStatus(info.message));
    } catch (error) {
      if (error instanceof HttpException) throw error;
      else {
        this.logger.error(error);
        throw new HttpException('jwt error', HttpStatus.BAD_REQUEST);
      }
    }
  }
}

@Injectable()
export class RefreshTokenAuthGuard extends AuthGuard('refreshToken') {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    /**
     * @todo 배포 시 cookie에서만 가져오도록 수정
     */
    // const refreshToken = request.cookies['refreshToken'];
    const refreshToken =
      request.cookies['refreshToken'] || request.headers['authorization']?.split(' ')[1];

    if (!refreshToken) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'jwt must be provided',
          error: COMMON_ERROR_HTTP_STATUS_MESSAGE[400]
        },
        HttpStatus.BAD_REQUEST
      );
    }
    return super.canActivate(context);
  }

  handleRequest(
    err: any,
    user: any,
    info: { message: string | Record<string, any> },
    context: ExecutionContext
  ) {
    try {
      if (user) {
        return super.handleRequest(err, user, info, context);
      }

      if (err instanceof HttpException) throw err;

      throw new HttpException(
        {
          statusCode: getStatus(info.message),
          message: info.message,
          error: COMMON_ERROR_HTTP_STATUS_MESSAGE[getStatus(info.message)]
        },
        getStatus(info.message)
      );
    } catch (error) {
      if (error instanceof HttpException) throw error;
      else {
        this.logger.error(error);
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'jwt error',
            error: COMMON_ERROR_HTTP_STATUS_MESSAGE[400]
          },
          HttpStatus.BAD_REQUEST
        );
      }
    }
  }
}

@Injectable()
export class AccessTokenOptionalAuthGuard extends AuthGuard('accessToken') {}

@Injectable()
export class AdminGuard extends AuthGuard('accessToken') {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    /**
     * @todo 배포 시 cookie에서만 가져오도록 수정
     */
    // const accessToken = request.cookies['accessToken'];
    const accessToken =
      request.cookies['accessToken'] || request.headers['authorization']?.split(' ')[1];
    if (!accessToken) {
      throw new HttpException('jwt must be provided', HttpStatus.BAD_REQUEST);
    }

    return super.canActivate(context);
  }

  handleRequest(
    err: any,
    user: any,
    info: { message: string | Record<string, any> },
    context: ExecutionContext
  ) {
    try {
      if (user.userRole === UserRole.ADMIN) {
        return super.handleRequest(err, user, info, context);
      } else if (user.userRole !== UserRole.USER) {
        throw new HttpException(
          `You don't have permission to access this resource`,
          HttpStatus.FORBIDDEN
        );
      }
      if (err instanceof HttpException) throw err;

      throw new HttpException(info.message, getStatus(info.message));
    } catch (error) {
      if (error instanceof HttpException) throw error;
      else {
        this.logger.error(error);
        throw new HttpException('jwt error', HttpStatus.BAD_REQUEST);
      }
    }
  }
}

function getStatus(message: string | Record<string, any>): HttpStatus {
  switch (message) {
    case 'jwt expired':
    case 'invalid signature':
      return HttpStatus.UNAUTHORIZED;
    case 'jwt must be provided':
    case 'jwt malformed':
    case 'invalid token':
      return HttpStatus.BAD_REQUEST;
    default:
      return HttpStatus.BAD_REQUEST;
  }
}
