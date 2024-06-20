import {
  ClassSerializerInterceptor,
  INestApplication,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ENV_KEY } from '@src/core/app-config/constants/app-config.constant';
import { AppConfigService } from '@src/core/app-config/services/app-config.service';
import { HttpExceptionFilter } from '@src/exceptions/exception-filters/http-exception.filter';

@Injectable()
export class BootstrapService {
  setCors(app: INestApplication) {
    app.enableCors();
  }

  setLogger(app: INestApplication) {
    const logger = new Logger();

    app.useLogger(logger);
  }

  setPathPrefix(app: INestApplication) {
    app.setGlobalPrefix('api');
  }

  setInterceptor(app: INestApplication) {
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
    );
  }

  setFilter(app: INestApplication) {
    app.useGlobalFilters(app.get(HttpExceptionFilter));
  }

  async startingServer(app: INestApplication) {
    const appConfigService = app.get<AppConfigService>(AppConfigService);

    const PORT = appConfigService.get<number>(ENV_KEY.PORT);

    await app.listen(PORT);

    console.info(`Server listening on port ${PORT}`);
  }
}
