import { NestFactory } from '@nestjs/core';

import { AppModule } from '@src/app.module';
import { BootstrapService } from '@src/bootstrap.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const bootstrapService = app.get<BootstrapService>(BootstrapService);

  bootstrapService.setCors(app);
  bootstrapService.setLogger(app);
  bootstrapService.setPathPrefix(app);
  bootstrapService.setInterceptor(app);
  bootstrapService.setPipe(app);
  bootstrapService.setFilter(app);

  await bootstrapService.startingServer(app);
}

bootstrap();
