import { NestFactory } from '@nestjs/core';

import { AppModule } from '@src/app.module';
import { BootstrapService } from '@src/bootstrap.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const bootstrapService = app.get<BootstrapService>(BootstrapService);

  await bootstrapService.startingServer(app);
}
bootstrap();
