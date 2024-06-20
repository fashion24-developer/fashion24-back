import { Module } from '@nestjs/common';

import { ApiModule } from '@src/api/api.module';
import { BootstrapService } from '@src/bootstrap.service';
import { CoreModule } from '@src/core/core.module';

@Module({
  imports: [ApiModule, CoreModule],
  providers: [BootstrapService],
})
export class AppModule {}
