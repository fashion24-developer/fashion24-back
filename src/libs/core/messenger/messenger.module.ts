import { Module } from '@nestjs/common';

import { SlackModule, SlackService } from 'nestjs-slack';

import { ENV_KEY } from '@src/libs/core/app-config/constants/app-config.constant';
import { IAppConfigService } from '@src/libs/core/app-config/services/i-app-config-service.interface';
import { APP_CONFIG_SERVICE_DI_TOKEN } from '@src/libs/core/app-config/tokens/app-config.di-token';
import { Key } from '@src/libs/core/app-config/types/app-config.type';
import { MessengerService } from '@src/libs/core/messenger/services/messenger.service';
import { MESSENGER_SERVICE_DI_TOKEN } from '@src/libs/core/messenger/tokens/messenger-service.di-token';
import { slackChannel } from '@src/libs/core/messenger/types/app-slack.type';

@Module({
  imports: [
    SlackModule.forRootAsync({
      inject: [APP_CONFIG_SERVICE_DI_TOKEN],
      useFactory: (appConfigService: IAppConfigService<Key>) => {
        return {
          type: 'webhook',
          channels: [
            {
              name: slackChannel.internalServerError,
              url: appConfigService.get<string>(ENV_KEY.SLACK_SERVER_ERROR_WEBHOOK)
            }
          ]
        };
      }
    })
  ],
  providers: [SlackService, { provide: MESSENGER_SERVICE_DI_TOKEN, useClass: MessengerService }],
  exports: [MESSENGER_SERVICE_DI_TOKEN]
})
export class MessengerModule {}
