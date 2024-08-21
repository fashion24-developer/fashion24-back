import { Module } from '@nestjs/common';

import { AppConfigModule } from '@src/core/app-config/app-config.module';

@Module({
  imports: [AppConfigModule]
})
export class CoreModule {}
