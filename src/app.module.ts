import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { ApiModule } from '@src/api/api.module';
import { BootstrapService } from '@src/bootstrap.service';
import { CoreModule } from '@src/core/core.module';
import { ExceptionFiltersModule } from '@src/exceptions/exception-filters.module';
import { LoggerMiddleware } from '@src/middlewares/logger.middleware';

@Module({
  imports: [ApiModule, CoreModule, ExceptionFiltersModule],
  providers: [BootstrapService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
