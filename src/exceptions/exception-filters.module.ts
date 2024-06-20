import { Module } from '@nestjs/common';

import { HttpExceptionFilter } from '@src/exceptions/exception-filters/http-exception.filter';

@Module({
  providers: [HttpExceptionFilter],
})
export class ExceptionFiltersModule {}
