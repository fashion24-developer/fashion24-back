import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Inject, Logger } from '@nestjs/common';

import { Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { IMessengerService } from '@src/libs/core/messenger/services/i-messenger-service.interface';
import { MESSENGER_SERVICE_DI_TOKEN } from '@src/libs/core/messenger/tokens/messenger-service.di-token';

/**
 * node  process error exception
 * ex) ReferenceError, TypeError etc
 */
@Catch()
export class HttpProcessErrorExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
    @Inject(MESSENGER_SERVICE_DI_TOKEN) private readonly messengerService: IMessengerService
  ) {}

  async catch(exception: Error, host: ArgumentsHost): Promise<void> {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    const responseData = {
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: {
        message: 'Internal server error. Tell the backend developer',
        error: 'Internal server error'
      }
    };

    this.logger.error(exception);
    await this.messengerService.sendInternalServerError(exception);

    response.status(statusCode).json(responseData);
  }
}
