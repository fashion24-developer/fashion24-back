import { Module } from '@nestjs/common';

import { MessengerModule } from '@src/libs/core/messenger/messenger.module';
import { HttpExceptionFilter } from '@src/libs/exceptions/exception-filters/http-exception.filter';
import { HttpProcessErrorExceptionFilter } from '@src/libs/exceptions/exception-filters/process-error-exception.filter';

@Module({
  imports: [MessengerModule],
  providers: [HttpExceptionFilter, HttpProcessErrorExceptionFilter]
})
export class ExceptionFiltersModule {}
