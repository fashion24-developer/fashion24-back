import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const statusCode = exception.getStatus();
    const message = exception.getResponse();

    const responseData = {
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    };

    response.status(statusCode).json(responseData);
  }
}
