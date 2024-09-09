import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Observable } from 'rxjs';

import { UserRole } from '@src/api/users/enums/user-role.enum';

@Injectable()
export class AccessTokenAuthGuard extends AuthGuard('accessToken') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.cookies['accessToken'];
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
        console.log(error.message);
        throw new HttpException('jwt error', HttpStatus.BAD_REQUEST);
      }
    }
  }
}

@Injectable()
export class RefreshTokenAuthGuard extends AuthGuard('refreshToken') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.cookies['refreshToken'];
    if (!refreshToken) {
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
        console.log(error.message);
        throw new HttpException('jwt error', HttpStatus.BAD_REQUEST);
      }
    }
  }
}

@Injectable()
export class AccessTokenOptionalAuthGuard extends AuthGuard('accessToken') {}

@Injectable()
export class AdminGuard extends AccessTokenAuthGuard {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.cookies['accessToken'];
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
        console.log(error.message);
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
