import { Inject, Injectable } from '@nestjs/common';

import { SlackService } from 'nestjs-slack';

import { ValueOf } from '@src/common/types/common.type';
import { IAppConfigService } from '@src/libs/core/app-config/services/i-app-config-service.interface';
import { APP_CONFIG_SERVICE_DI_TOKEN } from '@src/libs/core/app-config/tokens/app-config.di-token';
import { Key } from '@src/libs/core/app-config/types/app-config.type';
import { IMessengerService } from '@src/libs/core/messenger/services/i-messenger-service.interface';
import { slackChannel } from '@src/libs/core/messenger/types/app-slack.type';

@Injectable()
export class MessengerService implements IMessengerService {
  constructor(
    @Inject(APP_CONFIG_SERVICE_DI_TOKEN) private readonly appConfigService: IAppConfigService<Key>,
    private readonly slackService: SlackService<ValueOf<typeof slackChannel>>
  ) {}

  sendInternalServerError(error: Error): Promise<void> {
    if (this.appConfigService.isLocal()) {
      return;
    }

    return this.slackService.sendText(
      `서버 내부 에러 발생(500번 에러)
      error name: ${error.name}
      error message: ${error.message}
      error stack: ${error.stack}`,
      {
        channel: slackChannel.internalServerError
      }
    );
  }
}
