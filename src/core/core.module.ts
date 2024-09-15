import { Module } from '@nestjs/common';

import { S3Module } from '@src/common/s3/s3.module';
import { AppConfigModule } from '@src/core/app-config/app-config.module';
import { LoggerModule } from '@src/core/app-config/logger/logger.module';

@Module({
  imports: [AppConfigModule, LoggerModule, S3Module]
})
export class CoreModule {}
