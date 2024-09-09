import { Inject, Injectable, Logger, NestMiddleware } from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';
    const startTime = new Date().getTime();

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      const endTime = new Date().getTime();
      const duration = `${endTime - startTime}ms`;

      this.logger.log(
        `| ${statusCode} | ${ip} | ${method} | ${originalUrl} | ${duration} | ${contentLength} ${userAgent}`
      );
    });

    next();
  }
}
