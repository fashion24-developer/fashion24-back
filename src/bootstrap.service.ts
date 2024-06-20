import { INestApplication, Injectable } from '@nestjs/common';

import { ENV_KEY } from '@src/core/app-config/constants/app-config.constant';
import { AppConfigService } from '@src/core/app-config/services/app-config.service';

@Injectable()
export class BootstrapService {
  async startingServer(app: INestApplication) {
    const appConfigService = app.get<AppConfigService>(AppConfigService);

    const PORT = appConfigService.get<number>(ENV_KEY.PORT);

    await app.listen(PORT);

    console.info(`Server listening on port ${PORT}`);
  }
}
