import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { ApiModule } from '@src/api/api.module';
import { BootstrapService } from '@src/bootstrap.service';
import { CoreModule } from '@src/core/core.module';
import { ExceptionFiltersModule } from '@src/exceptions/exception-filters.module';
import { LoggerMiddleware } from '@src/middlewares/logger.middleware';
import { PrismaModule } from '@src/prisma/prisma.module';

@Module({
  imports: [ApiModule, CoreModule, ExceptionFiltersModule, PrismaModule],
  providers: [BootstrapService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
