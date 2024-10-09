import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject
} from '@nestjs/common';

import { Request, Response } from 'express';

import { IMessengerService } from '@src/libs/core/messenger/services/i-messenger-service.interface';
import { MESSENGER_SERVICE_DI_TOKEN } from '@src/libs/core/messenger/tokens/messenger-service.di-token';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  constructor(
    @Inject(MESSENGER_SERVICE_DI_TOKEN) private readonly messengerService: IMessengerService
  ) {}

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const statusCode = exception.getStatus();
    const message = exception.getResponse();

    const responseData = {
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message
    };

    if (statusCode === HttpStatus.INTERNAL_SERVER_ERROR && exception.cause) {
      await this.messengerService.sendInternalServerError(exception.cause);
    }

    response.status(statusCode).json(responseData);
  }
}
