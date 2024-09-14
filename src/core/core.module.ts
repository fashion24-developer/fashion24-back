import { Module } from '@nestjs/common';

import { AppConfigModule } from '@src/core/app-config/app-config.module';
import { LoggerModule } from '@src/core/app-config/logger/logger.module';

@Module({
  imports: [AppConfigModule, LoggerModule]
})
export class CoreModule {}
